// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3AAHAVTDihk3MYFUygGk_QtkEFa3ZnHQ",
  authDomain: "password-protectors.firebaseapp.com",
  projectId: "password-protectors",
  storageBucket: "password-protectors.appspot.com",
  messagingSenderId: "61765507177",
  appId: "1:61765507177:web:f8d7dba3079fba05d8aaf8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export default firebase;