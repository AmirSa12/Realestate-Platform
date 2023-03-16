import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgtJgEfs_FEfu55PmMANzhZo2qWH0RzD0",
  authDomain: "house-sale-40347.firebaseapp.com",
  projectId: "house-sale-40347",
  storageBucket: "house-sale-40347.appspot.com",
  messagingSenderId: "1092182697799",
  appId: "1:1092182697799:web:d9bc01991af43b8de48e62"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()