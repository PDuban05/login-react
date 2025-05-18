import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


export {collection,doc,getDoc,setDoc,getDocs,query,updateDoc,deleteDoc,addDoc,where,onSnapshot} from 'firebase/firestore';   


// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: import.meta.env.VITE_PROYECT_iD + '.firebaseapp.com',
//   projectId: import.meta.env.VITE_PROYECT_iD, 
//   storageBucket: import.meta.env.VITE_PROYECT_iD + '.appspot.com'
apiKey: "AIzaSyDsOCwgMIHYnhc-Q3NQu1-hXASWxvmEboY",
  authDomain: "login-78320.firebaseapp.com",
  projectId: "login-78320",
  storageBucket: "login-78320.firebasestorage.app",
  messagingSenderId: "499541201057",
  appId: "1:499541201057:web:675adead93b00de57160e0"
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage(firebaseApp);



