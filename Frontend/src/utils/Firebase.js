import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: "mentora-3212a.firebaseapp.com",
    projectId: "mentora-3212a",
    storageBucket: "mentora-3212a.firebasestorage.app",
    messagingSenderId: "597081257278",
    appId: "1:597081257278:web:1c6cf5c2acaceb9670a86f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
