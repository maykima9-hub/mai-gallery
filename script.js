window.onload = async function () {

    await loadPaintings();

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
