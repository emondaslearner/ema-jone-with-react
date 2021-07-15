import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../firebaseConfig/firebase.config';
//initialize react app
export const initialize = () => {
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
}


//sing in with google
export const signInGoogle = () => {
    const providerGoogle = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(providerGoogle)
}


//sign in with facebook

export const signInFacebook = () => {
    const providerFacebook = new firebase.auth.FacebookAuthProvider();
    return firebase.auth()
        .signInWithPopup(providerFacebook)
}

//sign up by email and password
export const signUp = (name,email,password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
      updateName(name);
      return res;
    })
}

//sign in the user
export const signIn = (email,password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
}

//updateUser
const updateName = (name) => {
    const userName = firebase.auth().currentUser;
    userName.updateProfile({
      displayName: name,
    })
    .then(() => {
      // Update successful
      // ...
    })
    .catch((error) => {
      // An error occurred
      // ...
    }); 
  }
