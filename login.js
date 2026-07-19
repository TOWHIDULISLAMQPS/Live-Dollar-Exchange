// ===================================
// TS Dollar Exchange
// Admin Login JS
// ===================================


import { app } from "./firebase.js";


import {
    getAuth,
    signInWithEmailAndPassword
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



const auth = getAuth(app);



window.login = function(){


let email = document.getElementById("email").value;

let password = document.getElementById("password").value;



if(email==="" || password===""){

document.getElementById("msg").innerHTML =
"Please enter email and password";

return;

}



signInWithEmailAndPassword(auth,email,password)

.then(()=>{


document.getElementById("msg").innerHTML =
"✅ Login Successful";


setTimeout(()=>{

window.location.href="admin.html";

},1000);


})


.catch((error)=>{


document.getElementById("msg").innerHTML =
"❌ "+error.message;


});


}
