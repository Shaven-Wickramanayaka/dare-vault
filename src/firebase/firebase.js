import { initializeApp } from "firebase/app";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

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
export const functions = getFunctions(firebaseApp);

// // Logic to switch to emulators during local development
// if (location.hostname === "localhost") {
//   // Firestore Emulator
//   connectFirestoreEmulator(db, "127.0.0.1", 8080);

//   // Auth Emulator
//   connectAuthEmulator(auth, "http://127.0.0.1:9099");

//   // Functions Emulator (Matches the port from step 1)
//   connectFunctionsEmulator(functions, "127.0.0.1", 5001);
// }

export default firebaseApp;
