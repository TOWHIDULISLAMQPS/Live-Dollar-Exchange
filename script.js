import { db } from "./firebase.js";
import {
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";

let currentRate = 0;

const sendWallet = document.getElementById("sendWallet");

function updateCurrentRate() {

    const wallet = sendWallet.value;

    currentRate = Number(
        document.getElementById(wallet + "Buy").innerText
    );

}

updateCurrentRate();

sendWallet.addEventListener("change", updateCurrentRate);

// ===================================
// TS Dollar Exchange
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

if (sendAmount && receiveAmount) {

    sendAmount.addEventListener("input", () => {

        let usd = parseFloat(sendAmount.value);

        if (isNaN(usd)) {
            receiveAmount.value = "";
            return;
        }

        receiveAmount.value = (usd * currentRate).toFixed(2);

    });

}

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
// ===================================
// Active Navigation Menu
// ===================================

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {

link.addEventListener("click", function(){

navLinks.forEach(item=>item.classList.remove("active"));

this.classList.add("active");

});

});

// ===================================
// Button Ripple Effect
// ===================================

document.querySelectorAll(".btn").forEach(btn=>{

btn.addEventListener("click",function(e){

const circle=document.createElement("span");

const x=e.clientX-this.offsetLeft;

const y=e.clientY-this.offsetTop;

circle.style.left=x+"px";

circle.style.top=y+"px";

circle.classList.add("ripple");

this.appendChild(circle);

setTimeout(()=>{

circle.remove();

},600);

});

});

// ===================================
// Number Counter Animation
// ===================================

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const nums=entry.target.querySelectorAll(".counter");

nums.forEach(num=>{

let target=parseInt(num.dataset.target);

let count=0;

let speed=target/100;

const update=()=>{

count+=speed;

if(count<target){

num.innerHTML=Math.floor(count);

requestAnimationFrame(update);

}else{

num.innerHTML=target;

}

};

update();

});

observer.unobserve(entry.target);

}

});

});

document.querySelectorAll(".stats").forEach(sec=>{

observer.observe(sec);

});

// ===================================
// Fake Recent Exchange Notification
// ===================================

const customers=[

"Rahim",

"Karim",

"Hasan",

"Jahid",

"Sakib",

"Rakib",

"Tanvir",

"Naim"

];

const wallets=[

"Payoneer",

"Wise",

"USDT",

"Skrill"

];

function randomNotification(){

const name=customers[Math.floor(Math.random()*customers.length)];

const wallet=wallets[Math.floor(Math.random()*wallets.length)];

const amount=Math.floor(Math.random()*400)+50;

showNotification(

`${name} exchanged ${amount} USD via ${wallet}`

);

}

setInterval(randomNotification,25000);

// ===================================
// Footer Year
// ===================================

const year=document.getElementById("year");

if(year){

year.innerHTML=new Date().getFullYear();

}
// ===================================
// Page Fade Animation
// ===================================

document.addEventListener("DOMContentLoaded", () => {
    document.body.style.opacity = "0";

    setTimeout(() => {
        document.body.style.transition = "opacity .6s ease";
        document.body.style.opacity = "1";
    }, 100);
});

// ===================================
// Button Hover Scale
// ===================================

document.querySelectorAll(".btn").forEach(btn => {

    btn.addEventListener("mouseenter", () => {
        btn.style.transform = "scale(1.05)";
    });

    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "scale(1)";
    });

});

// ===================================
// Navbar Background On Scroll
// ===================================

window.addEventListener("scroll", () => {

    const nav = document.querySelector(".navbar");

    if (!nav) return;

    if (window.scrollY > 100) {

        nav.style.background = "#ffffff";
        nav.style.transition = ".3s";

    } else {

        nav.style.background = "";

    }

});

// ===================================
// Hero Text Animation
// ===================================

const heroTitle = document.querySelector(".hero h1");

if(heroTitle){

const words=[
"Fast Dollar Exchange",
"Trusted Exchange Service",
"Buy & Sell USD",
"Secure Online Exchange"
];

let i=0;

setInterval(()=>{

heroTitle.innerHTML=words[i];

i++;

if(i>=words.length){

i=0;

}

},4000);

}

// ===================================
// Console Welcome
// ===================================

console.log("Welcome to TS Dollar Exchange");
// ======================================
// Reveal Animation On Scroll
// ======================================

const revealElements = document.querySelectorAll(".feature-card, .wallet-box, .rate-card, .review-card");

function revealOnScroll() {

    const windowHeight = window.innerHeight;

    revealElements.forEach(el => {

        const top = el.getBoundingClientRect().top;

        if (top < windowHeight - 100) {

            el.style.opacity = "1";
            el.style.transform = "translateY(0)";

        }

    });

}

revealElements.forEach(el => {

    el.style.opacity = "0";
    el.style.transform = "translateY(50px)";
    el.style.transition = "all .7s ease";

});

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();


// ======================================
// Random Exchange ID Generator
// ======================================

function generateExchangeID(){

const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

let id="TS-";

for(let i=0;i<8;i++){

id+=chars.charAt(Math.floor(Math.random()*chars.length));

}

return id;

}

console.log("Exchange ID:",generateExchangeID());


// ======================================
// Live Clock
// ======================================

function liveClock(){

const clock=document.getElementById("liveClock");

if(!clock) return;

const now=new Date();

clock.innerHTML=now.toLocaleTimeString();

}

setInterval(liveClock,1000);


// ======================================
// Auto Change Hero Background
// ======================================

const hero=document.querySelector(".hero");

const heroImages=[

"https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1800&q=80",

"https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1800&q=80",

"https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1800&q=80"

];

let bgIndex=0;

setInterval(()=>{

if(hero){

bgIndex++;

if(bgIndex>=heroImages.length){

bgIndex=0;

}

hero.style.backgroundImage=
`linear-gradient(rgba(0,0,0,.60),rgba(0,0,0,.60)),url(${heroImages[bgIndex]})`;

}

},8000);


// ======================================
// Disable Right Click
// ======================================

document.addEventListener("contextmenu",function(e){

e.preventDefault();

});


// ======================================
// Disable F12 & Developer Shortcut
// ======================================

document.addEventListener("keydown",function(e){

if(
e.key==="F12" ||
(e.ctrlKey && e.shiftKey && e.key==="I") ||
(e.ctrlKey && e.shiftKey && e.key==="J") ||
(e.ctrlKey && e.key==="U")
){

e.preventDefault();

}

});


// ======================================
// Welcome Popup
// ======================================

setTimeout(()=>{

showNotification("Welcome to TS Dollar Exchange");

},2000);
// ===============================
// Firebase Live Rate
// ===============================

// Payoneer
onValue(ref(db, "exchangeRates/payoneer"), (snapshot) => {

    if (!snapshot.exists()) return;

    const data = snapshot.val();

    document.getElementById("payoneerBuy").textContent = data.buyRate;
    document.getElementById("payoneerSell").textContent = data.sellRate;

    updateCurrentRate();

});

// Wise
onValue(ref(db, "exchangeRates/wise"), (snapshot) => {

    if (!snapshot.exists()) return;

    const data = snapshot.val();

    document.getElementById("wiseBuy").textContent = data.buyRate;
    document.getElementById("wiseSell").textContent = data.sellRate;
    
    updateCurrentRate();

});


// USDT
onValue(ref(db, "exchangeRates/usdt"), (snapshot) => {

    if (!snapshot.exists()) return;

    const data = snapshot.val();

    document.getElementById("usdtBuy").textContent = data.buyRate;
    document.getElementById("usdtSell").textContent = data.sellRate;
    
    updateCurrentRate();

});

// SKRILL
onValue(ref(db, "exchangeRates/skrill"), (snapshot) => {

    const data = snapshot.val();

    if (data) {
        document.getElementById("skrillBuy").innerHTML = data.buyRate;
        document.getElementById("skrillSell").innerHTML = data.sellRate;
  
    updateCurrentRate();

});

