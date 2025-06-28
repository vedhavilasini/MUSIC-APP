// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWJqzXKlEZLwi0LqKkzSkniI6ZInKNcCY",
  authDomain: "music-app-6cc6e.firebaseapp.com",
  projectId: "music-app-6cc6e",
  storageBucket: "music-app-6cc6e.firebasestorage.app",
  messagingSenderId: "673646654627",
  appId: "1:673646654627:web:5dfb58491fce67d33b3b16"
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export let __Auth=getAuth(firebaseApp);
export let __DB=getFirestore(firebaseApp);

export default firebaseApp;
