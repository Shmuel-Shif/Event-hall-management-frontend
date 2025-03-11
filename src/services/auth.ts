import auth from '@react-native-firebase/auth';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { User } from '../store/types';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export class AuthService {
  static async login(email: string, password: string): Promise<User> {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const userData = await this.getUserData(userCredential.user.uid);
      return userData;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('שגיאה בהתחברות');
    }
  }

  static async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<User> {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        userData.email,
        userData.password
      );

      const db = getFirestore();
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        role: 'EMPLOYEE',
      });

      return {
        id: userCredential.user.uid,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        role: 'EMPLOYEE',
      };
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('שגיאה בהרשמה');
    }
  }

  static async getUserData(userId: string): Promise<User> {
    try {
      const db = getFirestore();
      const userDoc = await getDoc(doc(db, 'users', userId));
      const data = userDoc.data();

      if (!data) {
        throw new Error('לא נמצאו פרטי משתמש');
      }

      return {
        id: userId,
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || '',
        role: data.role || 'EMPLOYEE',
      };
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw new Error('שגיאה בטעינת פרטי משתמש');
    }
  }
} 