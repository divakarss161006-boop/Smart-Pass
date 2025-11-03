
import { app } from "./firebase/config.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  updateProfile 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { 
  getFirestore, 
  setDoc, 
  doc 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { 
  getStorage, 
  ref, 
  uploadString, 
  getDownloadURL 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const ALLOWED_DOMAIN = "@srishakthi.ac.in";
const STRONG_PW_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

let profileData = "";

// Profile photo preview
const photoUpload = document.getElementById("photoUpload");
const preview = document.getElementById("preview");
if (photoUpload && preview) {
  preview.onclick = () => photoUpload.click();
  photoUpload.onchange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      preview.src = ev.target.result;
      profileData = ev.target.result;
    };
    reader.readAsDataURL(file);
  };
}

// MAIN SIGNUP FUNCTION
async function signup(event) {
  // ✅ prevent page refresh
  if (event) event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const roll = document.getElementById("roll").value.trim();
  const dept = document.getElementById("dept").value.trim();
  const year = document.getElementById("year").value.trim();
  const hostel = document.getElementById("hostel").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;
  const msg = document.getElementById("msg");

  msg.style.color = "red";
  msg.textContent = ""; // clear message

  // ✅ Input Validation
  if (!profileData) return (msg.textContent = "Please upload your profile photo.");
  if (!name) return (msg.textContent = "Please enter your Full Name.");
  if (!roll) return (msg.textContent = "Please enter your Roll Number.");
  if (!dept) return (msg.textContent = "Please enter your Department.");
  if (!year) return (msg.textContent = "Please select your Year.");
  if (!hostel) return (msg.textContent = "Please enter your Hostel/Room.");
  if (!email.endsWith(ALLOWED_DOMAIN)) return (msg.textContent = "Use official college email (@srishakthi.ac.in).");
  if (!STRONG_PW_REGEX.test(password)) return (msg.textContent = "Password must include uppercase, lowercase, number & symbol (min 8 chars).");

  try {
    // ✅ Create user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // ✅ Upload profile image
    const storageRef = ref(storage, `students/${user.uid}/profile.jpg`);
    await uploadString(storageRef, profileData, "data_url");
    const photoURL = await getDownloadURL(storageRef);

    // ✅ Update profile
    await updateProfile(user, { displayName: name, photoURL });

    // ✅ Store in Firestore
    await setDoc(doc(db, "students", user.uid), {
      role: "student",
      name,
      roll,
      email,
      dept,
      year,
      hostel,
      photoURL,
      createdAt: new Date().toISOString(),
    });

    // ✅ Show success and redirect
    msg.style.color = "green";
    msg.textContent = "Account created successfully! Redirecting to login...";

    // Give Firebase time to finish
    setTimeout(() => {
      window.location.href = "stulogin.html"; // 🔥 make sure this file name is EXACT
    }, 2500);

  } catch (error) {
    console.error(error);
    msg.textContent = error.code === "auth/email-already-in-use"
      ? "Email already in use. Please log in instead."
      : error.message;
  }
}

// ✅ Attach the function globally (for HTML onclick)
window.signup = signup;
