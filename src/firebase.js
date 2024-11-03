import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCv9jNNfWsTTf67mAMQKcht1EAsTgFL48o",
  authDomain: "sit313-week7.firebaseapp.com",
  projectId: "sit313-week7",
  storageBucket: "sit313-week7.appspot.com",
  messagingSenderId: "518532493677",
  appId: "1:518532493677:web:2732ca690d489cc451ea64",
  measurementId: "G-2BD57X7X4E"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 

export { auth, db };