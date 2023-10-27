// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8tGjNfmC3v0f_PnUiRpT7lYcXLVnOTK8",
  authDomain: "bondhu-67827.firebaseapp.com",
  projectId: "bondhu-67827",
  storageBucket: "bondhu-67827.appspot.com",
  messagingSenderId: "791059272415",
  appId: "1:791059272415:web:a46f28f0ff0e2fb4e04f6a",
  measurementId: "G-S6D1YF67WT",
  databaseUrl: "https://bondhu-67827-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getDatabase(app);
