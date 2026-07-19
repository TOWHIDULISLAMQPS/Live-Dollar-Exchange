// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBC0OA7gEWg1dfVzqVpI1YgbKzNKllz4pg",
  authDomain: "ts-dollar-exchange.firebaseapp.com",
  databaseURL: "https://ts-dollar-exchange-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ts-dollar-exchange",
  storageBucket: "ts-dollar-exchange.firebasestorage.app",
  messagingSenderId: "458864027860",
  appId: "1:458864027860:web:b5a0e671b4ca8f53bfb341"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
