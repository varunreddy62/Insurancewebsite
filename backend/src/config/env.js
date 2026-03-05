'use strict';

require('dotenv').config();

const env = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',

    // JWT
    JWT_SECRET: process.env.JWT_SECRET,

    // Frontend (CORS)
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',

    // Telegram
    TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN || '',
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID || '',

    // Firebase
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY
        ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
        : undefined,

    // reCAPTCHA
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY || '',
};

// ── Validate required variables ──────────────────────────────
const required = [
    'JWT_SECRET',
    'FIREBASE_PROJECT_ID',
    'FIREBASE_CLIENT_EMAIL',
    'FIREBASE_PRIVATE_KEY',
    'RECAPTCHA_SECRET_KEY'
];

const missing = required.filter((key) => !env[key]);

if (missing.length > 0) {
    console.error(`❌ Missing required environment variables: ${missing.join(', ')}`);
    process.exit(1);
}

module.exports = env;
