import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAZDLq04yRF41Ob_nJCPfqnvFfFoox4X6E",
    authDomain: "expertizo-advance-81f41.firebaseapp.com",
    projectId: "expertizo-advance-81f41",
    storageBucket: "expertizo-advance-81f41.firebasestorage.app",
    messagingSenderId: "113815066659",
    appId: "1:113815066659:web:c7314496372e6ce9f0b996"
};  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);