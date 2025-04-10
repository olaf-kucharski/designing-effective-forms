// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDEdx-4IA7mCt8fYahnuVfKN3dVwCYwjk",
  authDomain: "laby-4-tpf.firebaseapp.com",
  projectId: "laby-4-tpf",
  storageBucket: "laby-4-tpf.firebasestorage.app",
  messagingSenderId: "907674503010",
  appId: "1:907674503010:web:30d9154162e0d7c9104e3b",
  measurementId: "G-59BJ726S99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const nameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('exampleInputEmail1');

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt:'select_account'
})

const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");

const userSignIn = async () => {
    signInWithPopup(auth,
    provider).then((result) => {
    const user = result.user;
    console.log(user);
    const names = user.displayName.split(" ");
    nameInput.value = names[0];
    lastNameInput.value = names[1];
    emailInput.value = user.email;
    console.log(user.email);
    }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    })
}

const userSignOut = async () => {
    signOut(auth).then(() => {
    alert("You have been signed out!")
    }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    })
}

onAuthStateChanged(auth, (user) => {
    if (user) {
    alert("You are authenticated with Google");
    console.log(user);
    }
})

signInButton.addEventListener("click", userSignIn);
signOutButton.addEventListener("click", userSignOut);
