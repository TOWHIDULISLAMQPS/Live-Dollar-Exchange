import { db } from "./firebase.js";
import {
  ref,
  set,
  get
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
