import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAuv45LS6SgwQ8memVsZWUswA0m2_FLnx0",
  authDomain: "firegram-realtimedb.firebaseapp.com",
  projectId: "firegram-realtimedb",
  storageBucket: "firegram-realtimedb.appspot.com",
  messagingSenderId: "523886705280",
  appId: "1:523886705280:web:6dfc77653260d2e47c8465"
};


const app = initializeApp(firebaseConfig);
const projectStorage = getStorage()
const projectFirestore = getFirestore()

export { projectStorage, projectFirestore }
