import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import firebase from "firebase/app";

import "./assets/tailwind.css";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4WU2XG9ho4KB1Cx6YIxz5lmNq_Xocxpg",
  authDomain: "vue-firebase-50a00.firebaseapp.com",
  projectId: "vue-firebase-50a00",
  storageBucket: "vue-firebase-50a00.appspot.com",
  messagingSenderId: "445918461863",
  appId: "1:445918461863:web:199e88c64d632480168082",
  databaseURL:
    "https://vue-firebase-50a00-default-rtdb.europe-west1.firebasedatabase.app/",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.database();

let app = null;

firebase.auth().onAuthStateChanged(() => {
  console.log("reloaded");
  if (!app) {
    app = createApp(App)
      .use(router)
      .mount("#app");
  }
})
