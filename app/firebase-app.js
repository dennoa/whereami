import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const app = firebase.initializeApp({
  apiKey: 'AIzaSyAf79r2oUgm8nrNXr_bgcoulliocHQoExY',
  authDomain: 'whereami-3d479.firebaseapp.com',
  databaseURL: 'https://whereami-3d479.firebaseio.com',
  projectId: 'whereami-3d479',
  storageBucket: 'whereami-3d479.appspot.com',
  messagingSenderId: '119725428609',
})

function initialise(currentUser) {
  if (currentUser) {
    const db = firebase.database()
    db.ref(`users/${currentUser.uid}`).once('value', snapshot => {
      if (!snapshot.val()) {
        db.ref(`users/${currentUser.uid}`).set({ name: currentUser.displayName, markerColor: '#ff0000' })
      }
    })
  }
}

initialise(firebase.auth().currentUser)
firebase.auth().onAuthStateChanged(initialise)

export default app
