// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4db5s08kVY_khaXSQuruUbtJ_9CR_sD8",
  authDomain: "pantry-bd684.firebaseapp.com",
  projectId: "pantry-bd684",
  storageBucket: "pantry-bd684.appspot.com",
  messagingSenderId: "65784449826",
  appId: "1:65784449826:web:211fa04fdbb713b9b4b37b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireStore = getFirestore(app);
export {
  app,
  fireStore
};