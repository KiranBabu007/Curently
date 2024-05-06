import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from 'firebase/database';
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQ5mufOTfCwP5IDKdTwq55WcbAZCfHVMk",
  authDomain: "curently-3c0a6.firebaseapp.com",
  databaseURL: "https://curently-3c0a6-default-rtdb.firebaseio.com",
  projectId: "curently-3c0a6",
  storageBucket: "curently-3c0a6.appspot.com",
  messagingSenderId: "877764144889",
  appId: "1:877764144889:web:c07fdcc5e1bf80fda7fc28"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const firestore = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
}); 