import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAzhfGBLk1SmAySJIjgKOGRIUc4dlYnMwo",
  authDomain: "expertizo-react.firebaseapp.com",
  projectId: "expertizo-react",
  storageBucket: "expertizo-react.appspot.com",
  messagingSenderId: "605177178615",
  appId: "1:605177178615:web:db1e472b468e8ac90a26f2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
