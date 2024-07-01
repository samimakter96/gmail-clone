import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXbhEAKz0MljMuwJy-vuoj2dkZsYqK3nw",
  authDomain: "clone-bdbc1.firebaseapp.com",
  projectId: "clone-bdbc1",
  storageBucket: "clone-bdbc1.appspot.com",
  messagingSenderId: "489246309290",
  appId: "1:489246309290:web:4b22a08eae7d5f2f2b89d3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
