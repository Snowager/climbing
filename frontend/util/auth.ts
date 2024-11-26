import { initializeApp, FirebaseOptions } from 'firebase/app'
import { createUserWithEmailAndPassword, EmailAuthCredential, getAuth, signInWithEmailAndPassword, User } from 'firebase/auth'
import { useContext } from 'react';
import { ErrorContext } from '../context/authContext';
import * as errors from 'firebase/auth/dist/functions'

const firebaseConfig: FirebaseOptions = {
    apiKey: process.env.EXPO_PUBLIC_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_APP_ID,
    measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig);
// {error, setError} = useContext(ErrorContext);

const auth = getAuth(app);

export {auth};


export const createNewUser = async (auth, email, password, setError) => {
    createUserWithEmailAndPassword(auth, email, password).catch((authError) => {
        if (authError.code === "auth/invalid-email") {
            setError("INVALID EMAIL \n That's not an email, that's a phone! \n duhhhh!");
        } else if (authError.code === 'auth/email-already-in-use') {
            setError("PRE-EXISTING EMAIL \n We already got one of those \n get another email \n broke-ahh user");
        } else if (authError.code === 'auth/weak-password') {
            setError("WEAK ASS PASSWORD \n Bro. \n Does your password \n even lift?");
        }
    });
};

export const signInUser = async (auth, email, password, setError) => {
    signInWithEmailAndPassword(auth, email, password).catch((authError) => {
        console.log(authError.message)
        if (authError.code === "auth/invalid-email") {
            setError("INVALID EMAIL \n That's not an email, that's a phone! \n duhhhh!");
        } else if (authError.code === 'auth/invalid-credential') {
            setError("INCORRECT PASSWORD \n That's not your password \n dummy");
        }
    })
};