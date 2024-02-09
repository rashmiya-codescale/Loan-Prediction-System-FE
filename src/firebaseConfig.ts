// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB-2LevMaotlUM5JMzVd1OXolMPFp3bAa0',
  authDomain: 'authone-74980.firebaseapp.com',
  projectId: 'authone-74980',
  storageBucket: 'authone-74980.appspot.com',
  messagingSenderId: '527977560048',
  appId: '1:527977560048:web:518a85680d8a373a94cf35',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firebase_auth = getAuth(app);
export const firestore_db = getFirestore(app);
