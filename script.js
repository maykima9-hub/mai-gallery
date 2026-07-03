const gallery = document.getElementById("galleryContainer");
const cartItems = document.getElementById("cartItems");
const total = document.getElementById("total");

let paintings = [];
let cart = [];

async function loadPaintings() {

    const { data, error } = await supabase
        .from("paintings")
        .select("*")
        .order("id");

    if (error) {
        console.error(error);
        return;
    }

    paintings = data || [];

    renderGallery();
}

async function saveFavorite(index) {

    const painting = paintings[index];

    painting.favorite = !painting.favorite;

    const { error } = await supabase
        .from("paintings")
        .update({
            favorite: painting.favorite
        })
        .eq("id", painting.id);

    if (error) {
        console.error(error);
        return;
    }

    renderGallery();
}

function renderGallery() {

    gallery.innerHTML = "";

    paintings.forEach((item, index) => {

        gallery.innerHTML += `

<div class="card">

<div class="imageBox">

<img
src="${item.image}"
alt="${item.name}"
onclick="openImage('${item.image}')">

<button
class="favorite"
onclick="saveFavorite(${index})">

${item.favorite ? "❤️" : "🤍"}

</button>

${item.sold ? '<div class="soldBadge">נמכר</div>' : ""}

</div>

<h3>${item.name}</h3>

<p class="price">

${item.price} ₪

</p>

${item.sold
? '<button disabled>🔴 נמכר</button>'
: `<button onclick="addToCart(${index})">🛒 הוסף לעגלה</button>`}

</div>

`;

    });

}

function addToCart(index) {

    cart.push(paintings[index]);

    updateCart();

}

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}

function updateCart() {

    if (cart.length === 0) {

        cartItems.innerHTML = "העגלה ריקה";
        total.textContent = 0;
        return;

    }

    cartItems.innerHTML = "";

    let sum = 0;

    cart.forEach((item, index) => {

        sum += item.price;

        cartItems.innerHTML += `

<div class="cartItem">

<span>${item.name}</span>

<span>${item.price} ₪</span>

<button onclick="removeFromCart(${index})">

❌

</button>

</div>

`;

    });

    total.textContent = sum;

}

function openImage(image) {

    document.getElementById("lightbox").style.display = "flex";
    document.getElementById("lightboxImage").src = image;

}

document.getElementById("closeLightbox").onclick = function () {

    document.getElementById("lightbox").style.display = "none";

};

document.getElementById("lightbox").onclick = function (e) {

    if (e.target.id === "lightbox") {

        this.style.display = "none";

    }

};

document.getElementById("whatsappBtn").onclick = function () {

    if (cart.length === 0) {

        alert("העגלה ריקה");
        return;

    }

    let message = "🎨 שלום!%0A%0A";
    message += "אני רוצה להזמין את הציורים הבאים:%0A%0A";

    cart.forEach(item => {

        message += `🖼️ ${item.name} - ${item.price} ₪%0A`;

    });

    message += `%0A💰 סה"כ: ${total.textContent} ₪`;
    message += "%0A%0Aתודה רבה! 🌸";

    const phone = "972549816989";

    window.open(
        `https://api.whatsapp.com/send?phone=${phone}&text=${message}`,
        "_blank"
    );

};

window.onload = async function () {

    await loadPaintings();

    updateCart();

};

supabase
    .channel("paintings")

    .on(
        "postgres_changes",
        {
            event: "*",
            schema: "public",
            table: "paintings"
        },
        async () => {

            await loadPaintings();

        }
    )

    .subscribe();