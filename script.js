// ===================================
// TS Dollar Exchange
// script.js Part 1
// ===================================

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});


// Exchange Calculator

const sendAmount = document.querySelector('input[placeholder="Amount"]');
const receiveAmount = document.querySelector('input[placeholder="Receive Amount"]');

const rate = 122;

if (sendAmount && receiveAmount){

sendAmount.addEventListener("input",()=>{

let usd = parseFloat(sendAmount.value);

if(isNaN(usd)){

receiveAmount.value="";

return;

}

receiveAmount.value=(usd*rate).toFixed(2);

});

}


// Navbar Shadow

window.addEventListener("scroll",()=>{

const navbar=document.querySelector(".navbar");

if(window.scrollY>50){

navbar.style.boxShadow="0 10px 30px rgba(0,0,0,.15)";

}else{

navbar.style.boxShadow="0 2px 10px rgba(0,0,0,.05)";

}

});


// Counter Animation

const counters=document.querySelectorAll("h2");

counters.forEach(counter=>{

const update=()=>{

const target=+counter.innerText.replace(/\D/g,'');

if(target>100){

let count=+counter.getAttribute("data-count")||0;

let inc=Math.ceil(target/80);

if(count<target){

count+=inc;

counter.setAttribute("data-count",count);

counter.innerText=count+"+";

requestAnimationFrame(update);

}else{

counter.innerText=target+"+";

}

}

}

update();

});
// ===================================
// Loading Screen
// ===================================

window.addEventListener("load", () => {

const loader = document.getElementById("loader");

if(loader){

loader.style.opacity="0";

setTimeout(()=>{

loader.style.display="none";

},500);

}

});


// ===================================
// Scroll To Top
// ===================================

const topBtn=document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

if(!topBtn) return;

if(window.scrollY>300){

topBtn.style.display="flex";

}else{

topBtn.style.display="none";

}

});

if(topBtn){

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

}


// ===================================
// Current Date & Time
// ===================================

function updateTime(){

const el=document.getElementById("currentTime");

if(!el) return;

const now=new Date();

el.innerHTML=now.toLocaleString();

}

setInterval(updateTime,1000);


// ===================================
// Fake Live Visitor Counter
// ===================================

const visitor=document.getElementById("visitorCount");

if(visitor){

let total=Math.floor(Math.random()*100)+150;

visitor.innerHTML=total;

setInterval(()=>{

total+=Math.floor(Math.random()*3);

visitor.innerHTML=total;

},5000);

}


// ===================================
// Exchange Rate Auto Change Demo
// ===================================

setInterval(()=>{

const buy=document.getElementById("payoneerBuy");

const sell=document.getElementById("payoneerSell");

if(buy && sell){

let b=(121+Math.random()*3).toFixed(2);

let s=(123+Math.random()*3).toFixed(2);

buy.innerHTML=b;

sell.innerHTML=s;

}

},10000);


// ===================================
// Notification Popup
// ===================================

function showNotification(text){

const box=document.createElement("div");

box.innerHTML=text;

box.style.position="fixed";

box.style.top="20px";

box.style.right="20px";

box.style.background="#16a34a";

box.style.color="#fff";

box.style.padding="15px 25px";

box.style.borderRadius="10px";

box.style.zIndex="99999";

document.body.appendChild(box);

setTimeout(()=>{

box.remove();

},3000);

}


// ===================================
// Contact Form
// ===================================

const form=document.querySelector("form");

if(form){

form.addEventListener("submit",(e)=>{

e.preventDefault();

showNotification("Message Sent Successfully");

form.reset();

});

}
