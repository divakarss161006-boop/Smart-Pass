// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6Dz-Vz5PgEZQPBqQew0QIqKHu7ecZA4o",
  authDomain: "smart-pass-9b406.firebaseapp.com",
  projectId: "smart-pass-9b406",
  storageBucket: "smart-pass-9b406.appspot.com", // ✅ fixed here
  messagingSenderId: "932158553127",
  appId: "1:932158553127:web:6d33e47f0c61bc5e56a202",
  measurementId: "G-XM3G07TR05"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// ✅ Export for use in other files
export { app, auth, db, storage };
