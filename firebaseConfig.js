// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBAPb1vuPa_DELxUdA1-8T4hZ0cBpvm9kc",
    authDomain: "animalapp-f2251.firebaseapp.com",
    projectId: "animalapp-f2251",
    storageBucket: "animalapp-f2251.appspot.com",
    messagingSenderId: "28498883728",
    appId: "1:28498883728:web:4eb3ae2e1228e42ee79415"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});


export const db = getFirestore(app);

export const userRef = collection(db, "users");



