const defaultPaintings = [
{
name:"שקיעה עם בית שחור",
price:15,
image:"1.png",
sold:false,
favorite:false
},
{
name:"זאב צבעוני",
price:40,
image:"2.png",
sold:false,
favorite:false
},
{
name:"מנדלת השמיים",
price:60,
image:"3.png",
sold:false,
favorite:false
},
{
name:"אננס שחור",
price:40,
image:"4.png",
sold:false,
favorite:false
},
{
name:"גלים ורוד-כחול",
price:60,
image:"5.png",
sold:false,
favorite:false
},
{
name:"ילדה בטבע",
price:40,
image:"6.png",
sold:false,
favorite:false
},
{
name:"נוף סתיו",
price:40,
image:"7.png",
sold:false,
favorite:false
},
{
name:"חלון לים",
price:40,
image:"8.png",
sold:false,
favorite:false
}
];

let paintings =
JSON.parse(localStorage.getItem("paintings")) ||
defaultPaintings;

let cart=[];

const gallery=document.getElementById("galleryContainer");
const cartItems=document.getElementById("cartItems");
const total=document.getElementById("total");

function savePaintings(){

localStorage.setItem(
"paintings",
JSON.stringify(paintings)
);

}

function renderGallery(){

gallery.innerHTML="";

paintings.forEach((item,index)=>{

gallery.innerHTML+=`

<div class="card">

<div class="imageBox">

<img
src="${item.image}"
alt="${item.name}"
onclick="openImage('${item.image}')">

<button
class="favorite"
onclick="toggleFavorite(${index})">

${item.favorite ? "❤️" : "🤍"}

</button>

${item.sold ? `<div class="soldBadge">נמכר</div>` : ""}

</div>

<h3>${item.name}</h3>

<p class="price">

${item.price} ₪

</p>

${item.sold

?

`<button disabled>🔴 נמכר</button>`

:

`<button onclick="addToCart(${index})">

🛒 הוסף לעגלה

</button>`

}

</div>

`;

});

}

renderGallery();
function addToCart(index){

cart.push(paintings[index]);

updateCart();

}

function removeFromCart(index){

cart.splice(index,1);

updateCart();

}

function updateCart(){

if(cart.length===0){

cartItems.innerHTML="העגלה ריקה";

total.textContent=0;

return;

}

cartItems.innerHTML="";

let sum=0;

cart.forEach((item,index)=>{

sum+=item.price;

cartItems.innerHTML+=`

<div class="cartItem">

<span>${item.name}</span>

<span>${item.price} ₪</span>

<button onclick="removeFromCart(${index})">

❌

</button>

</div>

`;

});

total.textContent=sum;

}

function toggleFavorite(index){

paintings[index].favorite=!paintings[index].favorite;

savePaintings();

renderGallery();

}

function openImage(image){

document.getElementById("lightbox").style.display="flex";

document.getElementById("lightboxImage").src=image;

}

document.getElementById("closeLightbox").onclick=function(){

document.getElementById("lightbox").style.display="none";

};

document.getElementById("lightbox").onclick=function(e){

if(e.target.id==="lightbox"){

this.style.display="none";

}

};

document.getElementById("whatsappBtn").onclick=function(){

if(cart.length===0){

alert("העגלה ריקה");

return;

}

let message="🎨 שלום!%0A%0A";

message+="אני רוצה להזמין את הציורים הבאים:%0A%0A";

cart.forEach(item=>{

message+=`🖼️ ${item.name} - ${item.price} ₪%0A`;

});

message+=`%0A💰 סה"כ: ${total.textContent} ₪`;

message+="%0A%0Aתודה רבה! 🌸";

const phone="972549816989";

window.open(

`https://api.whatsapp.com/send?phone=${phone}&text=${message}`,

"_blank"

);

};
window.onload=function(){

const saved=localStorage.getItem("paintings");

if(saved){

paintings=JSON.parse(saved);

}

renderGallery();

updateCart();

};

window.addEventListener("storage", function () {

const saved = localStorage.getItem("paintings");

if(saved){

paintings = JSON.parse(saved);

renderGallery();

updateCart();

}

});