'use strict';

const admin = require('firebase-admin');
const env = require('./env');

// Initialize Firebase Admin SDK
const serviceAccount = {
    projectId: env.FIREBASE_PROJECT_ID,
    clientEmail: env.FIREBASE_CLIENT_EMAIL,
    privateKey: env.FIREBASE_PRIVATE_KEY,
};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Verify Firestore connection on startup
db.collection('admins').limit(1).get()
    .then(() => console.log('✅ Firestore connected successfully'))
    .catch((err) => console.error('❌ Firestore connection error:', err.message));

module.exports = { admin, db };
