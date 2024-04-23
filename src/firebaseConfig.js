import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC_nEPZK-kn14pnln7O03KDxLsLw1SMEOQ",
    authDomain: "aeneta-74130.firebaseapp.com",
    projectId: "aeneta-74130",
    storageBucket: "aeneta-74130.appspot.com",
    messagingSenderId: "1027744575211",
    appId: "1:1027744575211:web:77b894f68d7f769ba818ae",
    measurementId: "G-J2DEVPJBC3"
  };

initializeApp(firebaseConfig);
const auth = getAuth();

export { auth };
