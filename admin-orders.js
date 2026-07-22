import {
    ref,
    onValue,
    update
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";

// ==========================
// Elements
// ==========================

const ordersTable = document.getElementById("ordersTable");

const totalOrders = document.getElementById("totalOrders");
const pendingOrders = document.getElementById("pendingOrders");
const completedOrders = document.getElementById("completedOrders");
const cancelledOrders = document.getElementById("cancelledOrders");

// ==========================
// Global Orders
// ==========================

let allOrders = [];

// ==========================
// Load Orders
// ==========================

onValue(ref(db, "orders"), (snapshot) => {

    allOrders = [];

    if (snapshot.exists()) {

        snapshot.forEach((child) => {

            allOrders.push({
                firebaseKey: child.key,
                ...child.val()
            });

        });

    }

    renderOrders(allOrders);
    updateStats(allOrders);

});

// ==========================
// Render Orders Table
// ==========================

function renderOrders(orders) {

    if (!orders.length) {

        ordersTable.innerHTML = `
        <tr>
            <td colspan="11" class="text-center">
                No Orders Found
            </td>
        </tr>
        `;

        return;
    }

    let html = "";

    orders.forEach((order, index) => {

        let badge = "";

        if (order.status === "Pending") {

            badge =
            `<span class="badge bg-warning">
                Pending
            </span>`;

        }

        else if (order.status === "Completed") {

            badge =
            `<span class="badge bg-success">
                Completed
            </span>`;

        }

        else {

            badge =
            `<span class="badge bg-danger">
                Cancelled
            </span>`;

        }

        html += `

        <tr>

            <td>${index + 1}</td>

            <td>${order.orderId || "-"}</td>

            <td>${order.name || "-"}</td>

            <td>${order.phone || "-"}</td>

            <td>${order.wallet || "-"}</td>

            <td>${order.amount || 0}</td>

            <td>${order.receiveMethod || "-"}</td>

            <td>${order.trxId || "-"}</td>

            <td>${badge}</td>

            <td>${order.createdAt || "-"}</td>

            <td>

                <button
                class="btn btn-primary btn-sm viewBtn"
                data-id="${order.firebaseKey}">

                View

                </button>

            </td>

        </tr>

        `;

    });

    ordersTable.innerHTML = html;

}

console.log("Admin Orders JS Loaded");
// ======================================
// Dashboard Statistics
// ======================================

function updateStats(orders) {

    let total = orders.length;
    let pending = 0;
    let completed = 0;
    let cancelled = 0;

    orders.forEach(order => {

        if (order.status === "Pending") {
            pending++;
        }

        else if (order.status === "Completed") {
            completed++;
        }

        else if (order.status === "Cancelled") {
            cancelled++;
        }

    });

    totalOrders.innerText = total;
    pendingOrders.innerText = pending;
    completedOrders.innerText = completed;
    cancelledOrders.innerText = cancelled;

}

// ======================================
// Search Order
// ======================================

const searchOrder = document.getElementById("searchOrder");

if (searchOrder) {

    searchOrder.addEventListener("keyup", () => {

        const keyword = searchOrder.value.toLowerCase();

        const result = allOrders.filter(order => {

            return (

                (order.orderId || "").toLowerCase().includes(keyword) ||

                (order.name || "").toLowerCase().includes(keyword) ||

                (order.phone || "").toLowerCase().includes(keyword) ||

                (order.trxId || "").toLowerCase().includes(keyword)

            );

        });

        renderOrders(result);

    });

}

// ======================================
// Status Filter
// ======================================

const statusFilter = document.getElementById("statusFilter");

if (statusFilter) {

    statusFilter.addEventListener("change", () => {

        const status = statusFilter.value;

        if (status === "all") {

            renderOrders(allOrders);
            return;

        }

        const result = allOrders.filter(order => order.status === status);

        renderOrders(result);

    });

}

// ======================================
// Refresh Button
// ======================================

const refreshBtn = document.getElementById("refreshBtn");

if (refreshBtn) {

    refreshBtn.addEventListener("click", () => {

        renderOrders(allOrders);

        updateStats(allOrders);

        alert("Orders Refreshed Successfully");

    });

}
// ======================================
// View Order Details
// ======================================

import {
    update,
    child
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";

let selectedOrderKey = "";

document.addEventListener("click", (e) => {

    if (!e.target.classList.contains("viewBtn")) return;

    selectedOrderKey = e.target.dataset.id;

    const order = allOrders.find(item => item.firebaseKey === selectedOrderKey);

    if (!order) return;

    document.getElementById("mOrderId").innerText =
        order.orderId || "-";

    document.getElementById("mCustomer").innerText =
        order.name || "-";

    document.getElementById("mPhone").innerText =
        order.phone || "-";

    document.getElementById("mWallet").innerText =
        order.wallet || "-";

    document.getElementById("mAmount").innerText =
        order.amount || "-";

    document.getElementById("mReceiveMethod").innerText =
        order.receiveMethod || "-";

    document.getElementById("mReceiveAccount").innerText =
        order.receiveAccount || "-";

    document.getElementById("mTrx").innerText =
        order.trxId || "-";

    document.getElementById("mStatus").innerText =
        order.status || "-";

    document.getElementById("mDate").innerText =
        order.createdAt || "-";

    const modal =
        new bootstrap.Modal(document.getElementById("orderModal"));

    modal.show();

});

// ======================================
// Release Order
// ======================================

document.getElementById("releaseBtn").addEventListener("click", async () => {

    if (!selectedOrderKey) return;

    await update(
        ref(db, "orders/" + selectedOrderKey),
        {
            status: "Completed"
        }
    );

    bootstrap.Modal.getInstance(
        document.getElementById("orderModal")
    ).hide();

    alert("Order Released Successfully");

});

// ======================================
// Reject Order
// ======================================

document.getElementById("cancelBtn").addEventListener("click", async () => {

    if (!selectedOrderKey) return;

    await update(
        ref(db, "orders/" + selectedOrderKey),
        {
            status: "Cancelled"
        }
    );

    bootstrap.Modal.getInstance(
        document.getElementById("orderModal")
    ).hide();

    alert("Order Cancelled");

});
