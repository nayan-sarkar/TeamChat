// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore,collection, Timestamp, setDoc, getDoc, doc} from "firebase/firestore";
import { getStorage,ref ,uploadBytes, getDownloadURL} from "firebase/storage";

const firebaseConfig = {
 // Add fb config here
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
const auth = getAuth(app);

// Intialize Firestore
const db = getFirestore(app);

// Initalize Storage
const storage = getStorage(app);

export {auth,db,storage, Timestamp, setDoc, getDoc, doc, collection, getDownloadURL, ref, uploadBytes};
