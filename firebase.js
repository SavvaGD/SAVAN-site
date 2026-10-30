// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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

export const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const logout = () => signOut(auth);

// Загружаем данные ученика, а затем данные его группы
export const getUserAndGroupData = async (email) => {
  const userDoc = await getDoc(doc(db, "users", email));
  
  if (!userDoc.exists()) return null;

  const userData = userDoc.data();
  let groupData = null;

  if (userData.group) {
    // Ищем группу по ID, который указан у ученика
    const groupDoc = await getDoc(doc(db, "groups", userData.group));
    if (groupDoc.exists()) {
      groupData = groupDoc.data();
    }
  }

  return { user: userData, group: groupData };
};

export { onAuthStateChanged };
