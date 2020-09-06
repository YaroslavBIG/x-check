import firebase from '../../../config/firebase';

const db = firebase.firestore();

export function setUserProfileData(user: any, role: string, displayName: string) {
  return db.collection('users').doc(user.uid).set({
    displayName: displayName,
    email: user.email,
    photoURL: user.photoURL || null,
    role: role,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
}
