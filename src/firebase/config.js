import * as  firebase from 'firebase';
import 'firebase/firestore';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyArXI-E5a6iTP_doKuPLxm4Yaz6389iMUk",
    authDomain: "auth1-3d411.firebaseapp.com",
    databaseURL: "https://auth1-3d411.firebaseio.com",
    projectId: "auth1-3d411",
    storageBucket: "auth1-3d411.appspot.com",
    messagingSenderId: "495596778773",
    appId: "1:495596778773:web:4afe17225103c90e4d251c",
    measurementId: "G-ZEC4BLPK32"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
