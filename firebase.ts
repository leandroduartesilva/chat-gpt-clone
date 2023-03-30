import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwwr6ZIGefOzja7YtvLJGqWzVJthe5OYk",
  authDomain: "chatgpt-clone-374ae.firebaseapp.com",
  projectId: "chatgpt-clone-374ae",
  storageBucket: "chatgpt-clone-374ae.appspot.com",
  messagingSenderId: "312566307997",
  appId: "1:312566307997:web:5fdd24f37fca8a74608874"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }