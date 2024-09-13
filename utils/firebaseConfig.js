// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRBAxWsJwh4Z5SuGa84zg-xM3c3RzC15c",
  authDomain: "socialnetwork-27963.firebaseapp.com",
  projectId: "socialnetwork-27963",
  storageBucket: "socialnetwork-27963.appspot.com",
  messagingSenderId: "651710200137",
  appId: "1:651710200137:web:917470cd53364d9846c298",
  measurementId: "G-6CQLZ92PST"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);