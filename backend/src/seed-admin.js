'use strict';

/**
 * Run once to create the first admin in Firestore.
 *
 * Usage:
 *   node src/seed-admin.js
 *
 * You can change the name, email, and password below.
 */

const env = require('./config/env');
const { db } = require('./config/firebase');
const { hashPassword } = require('./utils/hash');
const { admin } = require('./config/firebase');

const ADMIN_NAME = 'Admin';
const ADMIN_EMAIL = 'admin@insurance.com';
const ADMIN_PASSWORD = 'admin123';

(async () => {
    try {
        console.log('🔄 Creating admin...');

        const passwordHash = await hashPassword(ADMIN_PASSWORD);

        const docRef = await db.collection('admins').add({
            name: ADMIN_NAME,
            email: ADMIN_EMAIL,
            passwordHash,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        console.log(`✅ Admin created successfully!`);
        console.log(`   ID:    ${docRef.id}`);
        console.log(`   Email: ${ADMIN_EMAIL}`);
        console.log(`   Pass:  ${ADMIN_PASSWORD}`);
        console.log('\n⚠️  Change the password after first login!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Failed to create admin:', err.message);
        process.exit(1);
    }
})();
