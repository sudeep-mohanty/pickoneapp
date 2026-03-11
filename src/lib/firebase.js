import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { nanoid } from "nanoid";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase (prevent duplicate init in dev mode)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

// Create a new session with two options
export async function createSession(opt1, opt2) {
  const id = nanoid(7); // short, URL-friendly ID like "x7k2mQ3"
  const sessionRef = doc(db, "sessions", id);

  await setDoc(sessionRef, {
    opt1,
    opt2,
    picked: null,
    createdAt: serverTimestamp(),
  });

  return id;
}

// Fetch a session by ID
export async function getSession(id) {
  const sessionRef = doc(db, "sessions", id);
  const snap = await getDoc(sessionRef);

  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

// Pick a finger (one-time action)
export async function pickFinger(id, side) {
  const sessionRef = doc(db, "sessions", id);
  await updateDoc(sessionRef, { picked: side });
}

// Listen for real-time updates (creator watches for the pick)
export function onSessionUpdate(id, callback) {
  const sessionRef = doc(db, "sessions", id);
  return onSnapshot(sessionRef, (snap) => {
    if (snap.exists()) {
      callback({ id: snap.id, ...snap.data() });
    }
  });
}
