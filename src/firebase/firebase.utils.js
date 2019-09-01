import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


  const config = {
    apiKey: "AIzaSyBgOslrj6gg6djD4c5nTbk400Fo5faxcT4",
    authDomain: "crwn-db-48047.firebaseapp.com",
    databaseURL: "https://crwn-db-48047.firebaseio.com",
    projectId: "crwn-db-48047",
    storageBucket: "",
    messagingSenderId: "120995028956",
    appId: "1:120995028956:web:57b404d4044a67a1"
  };

  firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;