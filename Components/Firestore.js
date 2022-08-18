import app from './Firebase.js'
import {getFirestore} from 'firebase/firestore'

const db = getFirestore(app);
export {db};

//Initialize a firestore database