// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Твои ключи (они уже правильные)
const firebaseConfig = {
  apiKey: "AIzaSyCO59_IWEHXOFMDOIhXYMeqzcZKw5rEq_0",
  authDomain: "savan-school.firebaseapp.com",
  projectId: "savan-school",
  storageBucket: "savan-school.firebasestorage.app",
  messagingSenderId: "16789921040",
  appId: "1:16789921040:web:ec08c90c1ad287aa8b1995"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Функции для работы (экспортируем, чтобы использовать на страницах)
export const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const logout = () => signOut(auth);
export const getUserData = async (email) => {
  const docRef = doc(db, "users", email);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};
export { onAuthStateChanged };
