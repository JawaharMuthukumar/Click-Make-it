import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile, 
  onAuthStateChanged,
  User as FirebaseUser 
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import type { User } from '../types';

const firebaseConfig = {
  apiKey: "AIzaSyB78NRWXPnmXJPlIJ_UNW0fQQ560HNTkUo",
  authDomain: "foody-makeit.firebaseapp.com",
  projectId: "foody-makeit",
  storageBucket: "foody-makeit.firebasestorage.app",
  messagingSenderId: "183449500900",
  appId: "1:183449500900:web:26e1903ff497ebc33d80f1",
  measurementId: "G-J6017JYXFG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Helper to fetch profile from Firestore
const fetchUserProfile = async (uid: string): Promise<Partial<User>> => {
    try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data() as Partial<User>;
        }
    } catch (e) {
        console.error("Error fetching user profile:", e);
    }
    return {};
};

export const signUp = async (fullName: string, email: string, password: string, phoneNumber: string): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName: fullName });
  
  // Initialize Plan Details
  const now = new Date();
  const currentMonth = `${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

  const userProfile = {
      fullName,
      email,
      plan: 'free',
      dishUsed: 0,
      currentMonth: currentMonth,
      phoneNumber, // Storing phone number in DB even if not in frontend User type
      createdAt: new Date().toISOString()
  };

  // Write to Firestore 'users' collection
  try {
      await setDoc(doc(db, "users", userCredential.user.uid), userProfile);
  } catch (e) {
      console.error("Error creating user profile in Firestore:", e);
      throw new Error("Failed to create user profile database entry.");
  }
  
  return {
      email: userCredential.user.email || '',
      fullName: fullName,
      country: undefined,
      state: undefined,
      plan: 'free',
      dishUsed: 0,
      currentMonth: currentMonth
  };
};

export const login = async (email: string, password: string): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const profile = await fetchUserProfile(userCredential.user.uid);
  
  return {
      email: userCredential.user.email || '',
      fullName: userCredential.user.displayName || profile.fullName || 'User',
      country: profile.country,
      state: profile.state,
      plan: (profile.plan as 'free' | 'monthly' | 'yearly') || 'free',
      dishUsed: profile.dishUsed || 0,
      currentMonth: profile.currentMonth
  };
};

export const logout = async () => {
    await signOut(auth);
};

export const subscribeToAuthChanges = (callback: (user: User | null) => void): () => void => {
    return onAuthStateChanged(auth, async (fbUser) => {
        if (fbUser) {
            const profile = await fetchUserProfile(fbUser.uid);
            const user: User = {
                email: fbUser.email || '',
                fullName: fbUser.displayName || profile.fullName || 'User',
                country: profile.country,
                state: profile.state,
                plan: (profile.plan as 'free' | 'monthly' | 'yearly') || 'free',
                dishUsed: profile.dishUsed || 0,
                currentMonth: profile.currentMonth
            };
            callback(user);
        } else {
            callback(null);
        }
    });
};

export const getCurrentUser = (): User | null => {
    // Note: This cannot fetch from Firestore synchronously. 
    // It returns basic auth info or null. 
    // Prefer using subscribeToAuthChanges for full profile.
    if (auth.currentUser) {
         return {
            email: auth.currentUser.email || '',
            fullName: auth.currentUser.displayName || 'User'
         };
    }
    return null;
};