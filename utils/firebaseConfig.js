// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChsPzIR7qe_qWytgFicKpSLYnm87nieeY",
  authDomain: "instaclon-17a1f.firebaseapp.com",
  projectId: "instaclon-17a1f",
  storageBucket: "instaclon-17a1f.appspot.com",
  messagingSenderId: "879820613003",
  appId: "1:879820613003:web:4e3c0271f1e0edf6bffb8e",
  measurementId: "G-6FG9BNMH7R"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);