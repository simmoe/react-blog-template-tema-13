import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyB-a24M4sUt5I44K9-ll0C7lyoH0pmpMr0",
    authDomain: "react-blog-firebase-3a7bc.firebaseapp.com",
    databaseURL: "https://react-blog-firebase-3a7bc.firebaseio.com",
    projectId: "react-blog-firebase-3a7bc",
    storageBucket: "react-blog-firebase-3a7bc.appspot.com",
    messagingSenderId: "221628049182",
    appId: "1:221628049182:web:c5e12af6f7f4de5e168b0f",
    measurementId: "G-0V6GB0QBCH"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)

  export default firebase