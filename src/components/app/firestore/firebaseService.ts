import firebase from '../../../config/firebase';
import { toast } from 'react-toastify';
import { setUserProfileData } from './firetostoreService';


export function signOutFirebase() {
  return firebase.auth().signOut();
}

export async function socialLoginGithub(selectedProvider: string, role: string, displayName: string) {
  let provider = new firebase.auth.GithubAuthProvider();

  try {
    const result = await firebase.auth().signInWithPopup(provider);
    await setUserProfileData(result.user, role, displayName);
  } catch (e) {
    toast.error(e.message);
  }
}
