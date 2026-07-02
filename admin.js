const PASSWORD = "1234";

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

let paintings = JSON.parse(localStorage.getItem("paintings")) || defaultPaintings;

function saveData(){

localStorage.setItem(
"paintings",
JSON.stringify(paintings)
);

}

function login(){

const password=document.getElementById("password").value;

if(password===PASSWORD){

document.getElementById("login").style.display="none";

document.getElementById("adminPanel").style.display="block";

render();

}else{

alert("סיסמה שגויה");

}

}
function render(){

const container=document.getElementById("paintings");

container.innerHTML="";

paintings.forEach((item,index)=>{

container.innerHTML+=`

<div class="paintCard">

<img src="${item.image}">

<h3>${item.name}</h3>

<p>מחיר: ₪${item.price}</p>

<p>${item.sold ? "🔴 נמכר" : "🟢 זמין"}</p>

<button onclick="toggleSold(${index})">

${item.sold ? "החזר לזמין" : "סמן כנמכר"}

</button>

<button onclick="changePrice(${index})">

שנה מחיר

</button>

<button onclick="changeName(${index})">

✏️ שנה שם

</button>

<button onclick="deletePainting(${index})">

🗑️ מחק ציור

</button>

</div>

`;

});

}

function toggleSold(index){

paintings[index].sold=!paintings[index].sold;

saveData();

render();

}

function changePrice(index){

let newPrice=prompt(
"הכניסי מחיר חדש:",
paintings[index].price
);

if(newPrice===null) return;

newPrice=Number(newPrice);

if(isNaN(newPrice)||newPrice<=0){

alert("מחיר לא תקין");

return;

}

paintings[index].price=newPrice;

saveData();

render();

}
function addPainting(){

const name=prompt("שם הציור:");

if(!name) return;

const price=Number(prompt("מחיר:"));

if(isNaN(price)) return;

const image=prompt("שם קובץ התמונה (לדוגמה: 9.png)");

if(!image) return;

paintings.push({

name:name,

price:price,

image:image,

sold:false,

favorite:false

});

saveData();

render();

}

function deletePainting(index){

if(confirm("למחוק את הציור?")){

paintings.splice(index,1);

saveData();

render();

}

}

function logout(){



document.getElementById("adminPanel").style.display="none";

document.getElementById("login").style.display="block";

document.getElementById("password").value="";

}
function changeName(index){

let newName = prompt(
"הכניסי שם חדש:",
paintings[index].name
);

if(newName===null) return;

newName = newName.trim();

if(newName==="") return;

paintings[index].name = newName;

saveData();

render();

}
