import firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

export default class FirebaseIntegration {

    constructor(callback) {
        this.initialize(callback);
    }

    initialize(callback) {
        if(!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                callback(null, user);
            } else {
                firebase.auth().signInAnonymously().catch(error => {
                    callback(error);
                });
            }
        });
    }

    get userId() {
        return firebase.auth().currentUser.uid;
    }

    get reference() {
        return firebase.firestore().collection('users').doc(this.userId).collection('toDoList');
    }
}