import { initializeApp, FirebaseOptions } from 'firebase/app'
import { createUserWithEmailAndPassword, getAuth, connectAuthEmulator } from 'firebase/auth'

const firebaseConfig: FirebaseOptions = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.APP_DOMAIN,
}

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const createNewUser = async (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
        const user = userCredentials.user;
    }).catch((error) => {
        console.log(error.message);
    })
};