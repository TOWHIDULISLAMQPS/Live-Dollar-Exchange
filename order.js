import { db } from "./firebase.js";

import {
    ref,
    push,
    set,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";

document.getElementById("submitOrder").addEventListener("click", async () => {

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const wallet = document.getElementById("wallet").value;
    const amount = Number(document.getElementById("amount").value);
    const receiveMethod = document.getElementById("receiveMethod").value;
    const receiveAccount = document.getElementById("receiveAccount").value.trim();
    const trxId = document.getElementById("trxId").value.trim();

    const message = document.getElementById("message");

    if (
        !name ||
        !phone ||
        !wallet ||
        !amount ||
        !receiveAccount ||
        !trxId
    ) {
        message.innerHTML = "❌ Please fill all fields";
        message.style.color = "red";
        return;
    }

    try {

        const orderRef = push(ref(db, "orders"));

        await set(orderRef, {

            orderId: orderRef.key,

            name: name,

            phone: phone,

            wallet: wallet,

            amount: amount,

            receiveMethod: receiveMethod,

            receiveAccount: receiveAccount,

            trxId: trxId,

            status: "Pending",

            createdAt: serverTimestamp()

        });

        message.innerHTML = "✅ Order Submitted Successfully";
        message.style.color = "green";

        document.getElementById("name").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("amount").value = "";
        document.getElementById("receiveAccount").value = "";
        document.getElementById("trxId").value = "";

    } catch (err) {

        console.error(err);

        message.innerHTML = "❌ Failed to submit order";
        message.style.color = "red";

    }

});
