import { db } from "./firebase.js";

import {
    ref,
    set,
    get,
    onValue,
    update
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";

// =====================================
// DOM
// =====================================

const wallet = document.getElementById("wallet");
const buyRate = document.getElementById("buyRate");
const sellRate = document.getElementById("sellRate");

const message = document.getElementById("message");
const lastUpdate = document.getElementById("lastUpdate");

const totalOrders = document.getElementById("totalOrders");
const pendingOrders = document.getElementById("pendingOrders");
const completedOrders = document.getElementById("completedOrders");
const cancelledOrders = document.getElementById("cancelledOrders");

const ordersTable = document.getElementById("ordersTable");

const searchOrder = document.getElementById("searchOrder");
const statusFilter = document.getElementById("statusFilter");
const refreshBtn = document.getElementById("refreshBtn");

let selectedOrderId = "";
let ordersData = [];

// =====================================
// SAVE RATE
// =====================================

window.saveRate = async function () {

    const buy = buyRate.value.trim();
    const sell = sellRate.value.trim();

    if (buy === "" || sell === "") {

        message.innerHTML = "❌ Please enter Buy & Sell Rate";
        message.style.color = "red";
        return;

    }

    try {

        const data = {

            wallet: wallet.value,

            buyRate: Number(buy),

            sellRate: Number(sell),

            updatedAt: new Date().toLocaleString()

        };

        await set(

            ref(db, "exchangeRates/" + wallet.value),

            data

        );

        message.innerHTML = "✅ Rate Saved Successfully";
        message.style.color = "green";

        lastUpdate.innerHTML =
            "Last Update : " + data.updatedAt;

    }

    catch (error) {

        console.log(error);

        message.innerHTML = "❌ Save Failed";
        message.style.color = "red";

    }

};

// =====================================
// LOAD RATE
// =====================================

async function loadRate() {

    try {

        const snapshot = await get(

            ref(db, "exchangeRates/" + wallet.value)

        );

        if (snapshot.exists()) {

            const data = snapshot.val();

            buyRate.value = data.buyRate;
            sellRate.value = data.sellRate;

            lastUpdate.innerHTML =
                "Last Update : " + data.updatedAt;

        }

        else {

            buyRate.value = "";
            sellRate.value = "";

            lastUpdate.innerHTML = "";

        }

    }

    catch (error) {

        console.log(error);

    }

}

wallet.addEventListener("change", loadRate);

loadRate();

console.log("Admin JS Part 1 Loaded");
// =====================================
// DASHBOARD + LIVE ORDERS
// =====================================

const ordersRef = ref(db, "orders");

onValue(ordersRef, (snapshot) => {

    ordersData = [];

    ordersTable.innerHTML = "";

    let total = 0;
    let pending = 0;
    let completed = 0;
    let cancelled = 0;

    if (!snapshot.exists()) {

        ordersTable.innerHTML = `
        <tr>
            <td colspan="8" class="text-center py-4">
                No Orders Found
            </td>
        </tr>`;

        totalOrders.innerHTML = 0;
        pendingOrders.innerHTML = 0;
        completedOrders.innerHTML = 0;
        cancelledOrders.innerHTML = 0;

        return;
    }

    snapshot.forEach((child) => {

        const id = child.key;

        const order = child.val();

        ordersData.push({
            id,
            ...order
        });

    });

    renderOrders();

});


// =====================================
// RENDER TABLE
// =====================================

function renderOrders() {

    ordersTable.innerHTML = "";

    let total = 0;
    let pending = 0;
    let completed = 0;
    let cancelled = 0;

    let keyword = "";

    if (searchOrder) {

        keyword = searchOrder.value.toLowerCase();

    }

    let filter = "all";

    if (statusFilter) {

        filter = statusFilter.value;

    }

    let count = 1;

    ordersData.forEach((order) => {

        const status = order.status || "Pending";

        total++;

        if (status === "Pending") pending++;

        if (status === "Released") completed++;

        if (status === "Rejected") cancelled++;

        if (
            keyword &&
            !(order.name || "").toLowerCase().includes(keyword) &&
            !order.id.toLowerCase().includes(keyword)
        ) {
            return;
        }

       // =====================================
// VIEW ORDER
// =====================================

window.viewOrder = function (id) {

    selectedOrderId = id;

    const order = ordersData.find(item => item.id === id);

    if (!order) return;

    document.getElementById("mOrderId").innerHTML = id;
    document.getElementById("mCustomer").innerHTML = order.name || "-";
    document.getElementById("mPhone").innerHTML = order.phone || "-";
    document.getElementById("mWallet").innerHTML = order.wallet || "-";
    document.getElementById("mAmount").innerHTML = order.amount || "-";
    document.getElementById("mReceiveMethod").innerHTML = order.receiveMethod || "-";
    document.getElementById("mReceiveAccount").innerHTML = order.receiveAccount || "-";
    document.getElementById("mTrx").innerHTML = order.trxId || "-";
    document.getElementById("mStatus").innerHTML = order.status || "Pending";
    document.getElementById("mDate").innerHTML = order.date || "-";

    const modal = new bootstrap.Modal(
        document.getElementById("orderModal")
    );

    modal.show();

};

// =====================================
// RELEASE ORDER
// =====================================

const releaseBtn = document.getElementById("releaseBtn");

if (releaseBtn) {

    releaseBtn.addEventListener("click", async () => {

        if (!selectedOrderId) return;

        try {

            await update(
                ref(db, "orders/" + selectedOrderId),
                {
                    status: "Released"
                }
            );

            alert("✅ Order Released");

            bootstrap.Modal.getInstance(
                document.getElementById("orderModal")
            ).hide();

        } catch (err) {

            console.log(err);

            alert("Release Failed");

        }

    });

}

// =====================================
// REJECT ORDER
// =====================================

const cancelBtn = document.getElementById("cancelBtn");

if (cancelBtn) {

    cancelBtn.addEventListener("click", async () => {

        if (!selectedOrderId) return;

        try {

            await update(
                ref(db, "orders/" + selectedOrderId),
                {
                    status: "Rejected"
                }
            );

            alert("❌ Order Rejected");

            bootstrap.Modal.getInstance(
                document.getElementById("orderModal")
            ).hide();

        } catch (err) {

            console.log(err);

            alert("Reject Failed");

        }

    });

}

console.log("Admin JS Part 3 Loaded");
// =====================================
// AUTO REFRESH
// =====================================

setInterval(() => {

    renderOrders();

}, 10000);

// =====================================
// LIVE STATUS
// =====================================

const liveStatus = document.getElementById("liveStatus");

function updateLiveClock() {

    if (!liveStatus) return;

    const now = new Date();

    liveStatus.innerHTML =
        "🟢 LIVE • " + now.toLocaleTimeString();

}

updateLiveClock();

setInterval(updateLiveClock, 1000);

// =====================================
// INITIALIZE
// =====================================

window.addEventListener("load", () => {

    loadRate();

    renderOrders();

});

// =====================================
// GLOBAL ERROR
// =====================================

window.addEventListener("error", (e) => {

    console.error("Admin Error :", e.message);

});

// =====================================
// FIREBASE CONNECTION CHECK
// =====================================

get(ref(db, ".info/connected"))

.then((snapshot) => {

    if (snapshot.exists()) {

        console.log("Firebase Connected");

    }

})

.catch((err) => {

    console.log(err);

});

// =====================================
// END
// =====================================

console.log("================================");
console.log("TS Dollar Exchange Admin Loaded");
console.log("Version : 1.0");
console.log("================================");
