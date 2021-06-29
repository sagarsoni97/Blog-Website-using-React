import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyChI5YZ-6L152PzTPlQQJ2auTs8uqz1X4w",
  authDomain: "blogwebsite-746fd.firebaseapp.com",
  projectId: "blogwebsite-746fd",
  storageBucket: "blogwebsite-746fd.appspot.com",
  messagingSenderId: "1091809736940",
  appId: "1:1091809736940:web:1d95e7120b870243fc0dc9"
};

if(!firebase.apps.length) firebase.initializeApp(firebaseConfig)

const auth  = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp


export {auth, db, storage, serverTimestamp};