import  firebase from 'firebase'
require('@firebase/firestore')
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDRqeySQyQgZD831vo0-dD1n3EBaVtGj6Q",
    authDomain: "book-santa-f28ce.firebaseapp.com",
    databaseURL : "https://book-santa-f28ce.firebaseio.com",
    projectId: "book-santa-f28ce",
    storageBucket: "book-santa-f28ce.appspot.com",
    messagingSenderId: "699619948699",
    appId: "1:699619948699:web:a80a03a2d075d1feed6e3e"
  };
  
  

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
  export default firebase.firestore()