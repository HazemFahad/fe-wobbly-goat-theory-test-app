// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7dlYIK5i4DzID_cSHNwv2iUrbaRx6u7Y",
  authDomain: "framwork-wg-theory-app.firebaseapp.com",
  projectId: "framwork-wg-theory-app",
  storageBucket: "framwork-wg-theory-app.appspot.com",
  messagingSenderId: "374183303974",
  appId: "1:374183303974:web:acd4454f58408d79b3ffe7",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };
