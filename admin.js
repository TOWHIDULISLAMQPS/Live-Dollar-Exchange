// =====================================
// TS Dollar Exchange
// Admin JS
// =====================================


import { db } from "./firebase.js";


import {
    ref,
    set
}
from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";



// Save Rate Function

window.saveRate = function(){


let wallet = document.getElementById("wallet").value;

let buy = document.getElementById("buyRate").value;

let sell = document.getElementById("sellRate").value;



if(buy==="" || sell===""){

document.getElementById("message").innerHTML =
"Please enter rate";

return;

}




set(ref(db,"rates/"+wallet),{


buy: Number(buy),

sell: Number(sell),

updated: new Date().toISOString()


})
.then(()=>{


document.getElementById("message").innerHTML =
"✅ Rate Saved Successfully";


document.getElementById("buyRate").value="";

document.getElementById("sellRate").value="";


})


.catch((error)=>{


document.getElementById("message").innerHTML =
"❌ Error: "+error.message;


});


}
