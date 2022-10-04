import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: `${process.env.apiKey}`,
    authDomain: `${process.env.authDomain}`,
    projectId: `${process.env.projectId}`,
    storageBucket: `${process.env.storageBucket}`,
    messagingSenderId: `${process.env.messagingSenderId}`,
    appId: `${process.env.appId}`,
    measurementId: `${process.env.measurementId}`
}

const app = initializeApp(firebaseConfig)

const auth = getAuth()
signInAnonymously(auth).then(() => {
    console.log("Signed in anonymously")
}).catch((error) => {
    console.error(error)
})


const db = getFirestore(app)
export { auth, db }