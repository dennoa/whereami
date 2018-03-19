import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebaseui'

const app = firebase.initializeApp({
  apiKey: 'AIzaSyAf79r2oUgm8nrNXr_bgcoulliocHQoExY',
  authDomain: 'whereami-3d479.firebaseapp.com',
  databaseURL: 'https://whereami-3d479.firebaseio.com',
  projectId: 'whereami-3d479',
  storageBucket: 'whereami-3d479.appspot.com',
  messagingSenderId: '119725428609',
})

export default app
