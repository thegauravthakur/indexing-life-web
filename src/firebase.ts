import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyD7bOSl5xbSZpFtuuCoVlKv99hcPpqcrc4',
    authDomain: 'central-mission-313915.firebaseapp.com',
    projectId: 'central-mission-313915',
    storageBucket: 'central-mission-313915.appspot.com',
    messagingSenderId: '503442647803',
    appId: '1:503442647803:web:93ac0b885cb05e376c9e5e',
    measurementId: 'G-TJKBY3550D',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
getAnalytics(app);
