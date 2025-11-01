import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6Dz-Vz5PgEZQPBqQew0QIqKHu7ecZA4o",
  authDomain: "smart-pass-9b406.firebaseapp.com",
  projectId: "smart-pass-9b406",
  storageBucket: "smart-pass-9b406.firebasestorage.app",
  messagingSenderId: "932158553127",
  appId: "1:932158553127:web:6d33e47f0c61bc5e56a202",
  measurementId: "G-XM3G07TR05"
  
};
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };