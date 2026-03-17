import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDpDElRz_rYnoD_ed_64S_z4KDAAKWeq0w",
  authDomain: "esusu-59f2d.firebaseapp.com",
  projectId: "esusu-59f2d",
  storageBucket: "esusu-59f2d.firebasestorage.app",
  messagingSenderId: "631275078488",
  appId: "1:631275078488:web:bff0ad96b7ea7a74b7db2d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
