import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAEhIC2TVpHciM7tRnSiSgA06kG90ttpFc",
  authDomain: "netflix-clone-89c7e.firebaseapp.com",
  projectId: "netflix-clone-89c7e",
  storageBucket: "netflix-clone-89c7e.appspot.com",
  messagingSenderId: "345936832512",
  appId: "1:345936832512:web:9d67ba4b5da9b31daa90e5",
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);

export { auth };
export default database;
