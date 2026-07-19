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
