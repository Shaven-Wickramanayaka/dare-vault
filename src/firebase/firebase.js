import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD80x4jxrr04WrzKc7HUDdPipePKT9LzMc",
  authDomain: "dare-vault.firebaseapp.com",
  projectId: "dare-vault",
  storageBucket: "dare-vault.firebasestorage.app",
  messagingSenderId: "574687369537",
  appId: "1:574687369537:web:9e06c4b1a4527e733529c0",
  measurementId: "G-DKNYQ68EBY",
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export default firebaseApp;
