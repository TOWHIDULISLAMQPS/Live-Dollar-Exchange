import {
  ref,
  set,
  get,
  onValue,
  update
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";

window.saveRate = async function () {

    const wallet = document.getElementById("wallet").value;
    const buyRate = document.getElementById("buyRate").value.trim();
    const sellRate = document.getElementById("sellRate").value.trim();
    const message = document.getElementById("message");

    message.innerHTML = "";

    if (buyRate === "" || sellRate === "") {
        message.innerHTML = "❌ Please enter Buy & Sell Rate";
        message.style.color = "red";
        return;
    }

    try {
      
        await set(ref(db, "exchangeRates/" + wallet), {

            wallet: wallet,
            buyRate: Number(buyRate),
            sellRate: Number(sellRate),
            updatedAt: new Date().toLocaleString()

        });
      
      showRate({
    buyRate: Number(buyRate),
    sellRate: Number(sellRate),
    updatedAt: new Date().toLocaleString()
});

        message.innerHTML = "✅ Rate Saved Successfully";
        message.style.color = "green";

        document.getElementById("buyRate").value = "";
        document.getElementById("sellRate").value = "";

    } catch (error) {

        console.error(error);

        message.innerHTML = "❌ Save Failed";
        message.style.color = "red";

    }

};

// Load Rate
async function loadRate() {

    const wallet = document.getElementById("wallet").value;

    try {

        const snapshot = await get(ref(db, "exchangeRates/" + wallet));

        if (snapshot.exists()) {

            const data = snapshot.val();

            document.getElementById("buyRate").value = data.buyRate;
            document.getElementById("sellRate").value = data.sellRate;

        } else {

            document.getElementById("buyRate").value = "";
            document.getElementById("sellRate").value = "";

        }

    } catch (error) {

        console.log(error);

    }

}

// প্রথমবার Page Load হলে
loadRate();

// Wallet পরিবর্তন হলে
document
    .getElementById("wallet")
    .addEventListener("change", loadRate);
function showRate(data) {

    document.getElementById("buyRate").value = data.buyRate;
    document.getElementById("sellRate").value = data.sellRate;

    const lastUpdate = document.getElementById("lastUpdate");

    if (lastUpdate) {
        lastUpdate.innerHTML = "Last Update : " + data.updatedAt;
    }

}
console.log("Admin JS Loaded");

// ===============================
// Load Orders
// ===============================

import {
  ref,
  onValue,
  update
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";


const ordersTable = document.getElementById("ordersTable");

let selectedOrderId = null;


// Load Orders From Firebase

const ordersRef = ref(db, "orders");

onValue(ordersRef, (snapshot)=>{

    ordersTable.innerHTML="";

    if(!snapshot.exists()){

        ordersTable.innerHTML = `
        <tr>
        <td colspan="7" class="text-center">
        No Orders Found
        </td>
        </tr>`;

        return;
    }


    let count = 1;


    snapshot.forEach((child)=>{

        let order = child.val();

        let id = child.key;


        ordersTable.innerHTML += `

        <tr>

        <td>${count++}</td>

        <td>${id}</td>

        <td>${order.name || "-"}</td>

        <td>${order.wallet || "-"}</td>

        <td>${order.amount || "-"}</td>


        <td>

        <span class="badge bg-warning">
        ${order.status || "Pending"}
        </span>

        </td>


        <td>

        <button 
        class="btn btn-sm btn-primary"
        onclick="viewOrder('${id}')">

        View

        </button>


        </td>


        </tr>

        `;


    });


});



// ===============================
// View Order
// ===============================

window.viewOrder = function(id){

selectedOrderId=id;


const orderRef = ref(db,"orders/"+id);


onValue(orderRef,(snapshot)=>{

let data=snapshot.val();


document.getElementById("mOrderId").innerHTML=id;

document.getElementById("mCustomer").innerHTML=data.name || "-";

document.getElementById("mPhone").innerHTML=data.phone || "-";

document.getElementById("mWallet").innerHTML=data.wallet || "-";

document.getElementById("mAmount").innerHTML=data.amount || "-";

document.getElementById("mStatus").innerHTML=data.status || "-";

document.getElementById("mDate").innerHTML=data.date || "-";



});


let modal = new bootstrap.Modal(
document.getElementById("orderModal")
);

modal.show();

};




// ===============================
// Release Order
// ===============================


document.getElementById("releaseBtn")
.addEventListener("click",()=>{


if(!selectedOrderId) return;


update(
ref(db,"orders/"+selectedOrderId),
{
status:"Released"
}

);


});





// ===============================
// Reject Order
// ===============================


document.getElementById("cancelBtn")
.addEventListener("click",()=>{


if(!selectedOrderId) return;


update(
ref(db,"orders/"+selectedOrderId),
{
status:"Rejected"
}

);


});
