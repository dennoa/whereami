import firebase from 'firebase'

const refs = {}

function clearRef(path) {
  if (typeof refs[path] !== 'undefined') {
    refs[path].off('value')
  }
}

export default function onValue(path, handler) {
  clearRef(path)
  refs[path] = firebase.database().ref(path)
  refs[path].on('value', snapshot => handler(snapshot.val()))
}
