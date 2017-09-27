import firebase from './';
import * as firebaseui from 'firebaseui';

export const uiConfig = {
  //signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccess: (user: firebase.User, credential: firebase.auth.AuthCredential, redirectUrl: string) => {
      if (user.email !== null && !user.emailVerified) {
        user.sendEmailVerification().then(() => {
          alert('確認メールを送信しました。');
        }).catch((error) => {
          console.log(error.message);
        });
      }
      return false;
    }
  },
  signInFlow: 'popup',
  tosUrl: '/about',
};

export const auth = firebase.auth();
export const authUI = new firebaseui.auth.AuthUI(auth);
