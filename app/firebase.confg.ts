// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgHhTmEaHR0w19MjW6Ew_WVnCke34J9zk",
  authDomain: "otp-sms-e1a4c.firebaseapp.com",
  projectId: "otp-sms-e1a4c",
  storageBucket: "otp-sms-e1a4c.appspot.com",
  messagingSenderId: "683296125812",
  appId: "1:683296125812:web:734f669a632f8e49f53221",
  measurementId: "G-2NVWXGVLE3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
