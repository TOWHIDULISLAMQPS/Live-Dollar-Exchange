import { db } from "./firebase.js";

import {
    ref,
    push,
    set
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";

const btn = document.getElementById("submitOrder");
const message = document.getElementById("message");

btn.addEventListener("click", async () => {

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const wallet = document.getElementById("wallet").value;
    const amount = document.getElementById("amount").value;
    const receiveMethod = document.getElementById("receiveMethod").value;
    const receiveAccount = document.getElementById("receiveAccount").value.trim();
    const trxId = document.getElementById("trxId").value.trim();

    if (
        !name ||
        !phone ||
        !amount ||
        !receiveAccount ||
        !trxId
    ) {

        message.innerHTML = "❌ Please fill all fields.";
        message.style.color = "red";
        return;

    }

    try {

        const orderRef = push(ref(db, "orders"));

        const orderId = "TS" + Date.now();

    await set(orderRef, {

    orderId: orderId,

    name: name,

    phone: phone,

    wallet: wallet,

    amount: Number(amount),

    receiveMethod: receiveMethod,

    receiveAccount: receiveAccount,

    trxId: trxId,

    status: "Pending",

    date: new Date().toLocaleString()

});

        message.innerHTML =
        "✅ Order Submitted Successfully.<br>Your Order ID : <b>" +
        orderId +
        "</b>";

        message.style.color = "lime";

        document.getElementById("name").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("amount").value = "";
        document.getElementById("receiveAccount").value = "";
        document.getElementById("trxId").value = "";

    } catch (err) {

        console.log(err);

        message.innerHTML = "❌ Failed to submit order.";

        message.style.color = "red";

    }

});
