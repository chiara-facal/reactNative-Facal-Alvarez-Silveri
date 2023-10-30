import app from 'firebase/app';
import firebase from 'firebase';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAi25wncygEMjEvJ_V3WO_FcnPMzBF_DHA",
    authDomain: "proyecto-alvarez-facal-silveri.firebaseapp.com",
    projectId: "proyecto-alvarez-facal-silveri",
    storageBucket: "proyecto-alvarez-facal-silveri.appspot.com",
    messagingSenderId: "552442161438",
    appId: "1:552442161438:web:6b546d6d5eabcaad33010f"
  };

  app.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const storage = app.storage();
  export const db = app.firestore();