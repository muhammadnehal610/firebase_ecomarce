import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  getDoc,
  getDocs,
  collection,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD_dTm02g_JQ5sE-n38fCZ9lRJyyEaM5zM",
  authDomain: "ecomarce-2cf65.firebaseapp.com",
  databaseURL: "https://ecomarce-2cf65-default-rtdb.firebaseio.com",
  projectId: "ecomarce-2cf65",
  storageBucket: "ecomarce-2cf65.appspot.com",
  messagingSenderId: "467509250885",
  appId: "1:467509250885:web:ff4d5359d7c67e0ecd8c2c",
  measurementId: "G-DHS13KJLZX",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export {
  auth,
  storage,
  db,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  doc,
  setDoc,
  getDocs,
  getDoc,
  ref,
  uploadBytes,
  getDownloadURL,
  addDoc,
  collection,
};
