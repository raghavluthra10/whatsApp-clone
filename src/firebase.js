import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyD-P0TivT8lDyFH430NEuH8I3blaTMA2Xg",
  authDomain: "whatsappclone-80ed4.firebaseapp.com",
  projectId: "whatsappclone-80ed4",
  storageBucket: "whatsappclone-80ed4.appspot.com",
  messagingSenderId: "800655900445",
  appId: "1:800655900445:web:452429aebe66c1de5dabf4"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export default db;

export { auth, provider };