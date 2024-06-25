import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC_nEPZK-kn14pnln7O03KDxLsLw1SMEOQ",
    authDomain: "aeneta-74130.firebaseapp.com",
    projectId: "aeneta-74130",
    storageBucket: "aeneta-74130.appspot.com",
    messagingSenderId: "1027744575211",
    appId: "1:1027744575211:web:77b894f68d7f769ba818ae ",
    measurementId: "G-J2DEVPJBC3"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage};
