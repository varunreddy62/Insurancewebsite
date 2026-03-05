'use strict';

const firestoreService = require('../services/firestore.service');
const { comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/jwt');
const env = require('../config/env');
const axios = require('axios');

/**
 * POST /admin/login
 * Authenticate an admin and return a JWT.
 */
const login = async (req, res, next) => {
    try {
        const { email, password, recaptchaToken } = req.body;

        // ── Verify reCAPTCHA ──────────────────────────────────
        if (env.RECAPTCHA_SECRET_KEY) {
            try {
                const recaptchaRes = await axios.post(
                    `https://www.google.com/recaptcha/api/siteverify?secret=${env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`
                );

                if (!recaptchaRes.data.success) {
                    return res.status(400).json({
                        success: false,
                        message: 'reCAPTCHA verification failed. Please try again.',
                    });
                }
            } catch (err) {
                console.error('reCAPTCHA verification error:', err.message);
                return res.status(500).json({
                    success: false,
                    message: 'Error verifying reCAPTCHA.',
                });
            }
        }

        // ── Find admin ────────────────────────────────────────
        const admin = await firestoreService.findAdminByEmail(email);

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password.',
            });
        }

        // ── Compare password ──────────────────────────────────
        const isMatch = await comparePassword(password, admin.passwordHash);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password.',
            });
        }

        // ── Generate JWT ──────────────────────────────────────
        const accessToken = generateToken({
            adminId: admin.id,
            email: admin.email,
        });

        // ── Log the login event ───────────────────────────────
        const ip = req.ip || req.connection.remoteAddress;
        await firestoreService.logLogin(admin.id, ip);

        return res.json({
            success: true,
            message: 'Login successful.',
            data: {
                accessToken,
                admin: {
                    id: admin.id,
                    name: admin.name,
                    email: admin.email,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { login };
