
import { db, collection, addDoc, query,getDocs, where,doc,updateDoc } from './firebase';
import bcrypt from 'bcryptjs';

//CREATE
export const createUser = async (user) => {
  const colRef = collection(db, "users");
  const data = await addDoc(colRef, user);
  return data.id;
}


export async function userExists(nombreUsuario, plainPassword) {
  const usersRef = collection(db, "users");

  try {
    const q = query(usersRef, where("nombreUsuario", "==", nombreUsuario));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return false; // Usuario no encontrado
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();

    const isMatch = await bcrypt.compare(plainPassword, userData.password);
    if (!isMatch) return false;

    const randomToken = Math.floor(100000 + Math.random() * 900000).toString();
    const userRef = doc(db, "users", userDoc.id);

    await updateDoc(userRef, {
      token: randomToken
    });

    return {
      id: userDoc.id,
      token: randomToken,
      ...userData // Retorna todos los campos del documento del usuario
    };

  } catch (error) {
    console.error("Error en userExists:", error);
    return false;
  }
}

