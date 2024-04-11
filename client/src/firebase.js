import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blogapp-221fc.firebaseapp.com",
  projectId: "blogapp-221fc",
  storageBucket: "blogapp-221fc.appspot.com",
  messagingSenderId: "252326239897",
  appId: "1:252326239897:web:e50f577d7662126d5ca208"
};

export const app = initializeApp(firebaseConfig);

