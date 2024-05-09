import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC90vNYFOqmQGLei8meOBUAHWFEIgy9TJ0',
  authDomain: 'gasagency-e33ba.firebaseapp.com',
  databaseURL: 'https://gasagency-e33ba-default-rtdb.firebaseio.com',
  projectId: 'gasagency-e33ba',
  storageBucket: 'gasagency-e33ba.appspot.com',
  messagingSenderId: '430534536234',
  appId: '1:430534536234:web:cd4e5d8931951d20b5e753',
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);

const storage = getStorage(app);

export { app, firestore, storage };
