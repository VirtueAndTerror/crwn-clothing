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

  // This take the 'userAuth' object we get back from the firebase/auth library and store it into our database.
  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    // We use the userAuth object to query our user id (uid).
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const collectionRef = firestore.collection('users');

    // Now we get the snapshot out of our queryReference Object.
    const snapShot = await userRef.get();
   

    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('ERROR CREATING USER!', error.message);
      }
    }
    // We might want to user later, so we return it here!!
    return userRef;
  }

  firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit(); 
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });


    return transformedCollection.reduce((accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    }, {});
    
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase; 