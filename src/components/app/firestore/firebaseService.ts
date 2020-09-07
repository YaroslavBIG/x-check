import firebase from '../../../config/firebase';
import { setUserProfileData } from './firetostoreService';

export async function socialLoginGithub(selectedProvider: string, role: string, displayName: string) {
  let provider = new firebase.auth.GithubAuthProvider();

  try {
    const result = await firebase.auth().signInWithPopup(provider);
    await setUserProfileData(result.user, role, displayName);
  } catch (e) {
    throw(e);
  }
}
