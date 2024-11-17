import { initializeApp, FirebaseOptions } from 'firebase/app'
import { createUserWithEmailAndPassword, EmailAuthCredential, getAuth, signInWithEmailAndPassword, User } from 'firebase/auth'

const firebaseConfig: FirebaseOptions = {
    apiKey: process.env.EXPO_PUBLIC_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_APP_ID,
    measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID,
}

console.log(firebaseConfig)

const app = initializeApp(firebaseConfig);

export const returnAuth = () => {
    const auth = getAuth(app)
    return auth;
};


export const createNewUser = async (email, password) => {
    const auth = getAuth(app);
    let user: User;

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
        user = userCredentials.user;
    }).catch((error) => {
        console.log(error.message);
    });
    //return await user.getIdTokenResult();
};

export const signInUser = async (email, password) => {
    const auth = getAuth(app);
    let user: User;
    console.log(email, password)
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
        user = userCredentials.user;
    }).catch((error) => {
        console.log(error.message);
    })
};