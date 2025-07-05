// api/submit.js
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database';

// Load Firebase config from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const submission = req.body;

  // Push to Firebase
  const submissionsRef = ref(db, 'submissions');
  const newSubmissionRef = push(submissionsRef);
  await newSubmissionRef.set({
    ...submission,
    timestamp: new Date().toISOString()
  });

  return res.status(200).json({ message: 'Submitted to Firebase!' });
}