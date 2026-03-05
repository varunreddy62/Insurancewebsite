'use strict';

const { verifyToken } = require('../utils/jwt');

/**
 * JWT authentication middleware for admin routes.
 *
 * 1. Reads the Authorization header (Bearer <token>)
 * 2. Verifies the JWT
 * 3. Attaches decoded admin payload to req.admin
 * 4. Returns 401 if missing or invalid
 */
const adminAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.',
            });
        }

        const token = authHeader.split(' ')[1];
        const decoded = verifyToken(token);

        // Attach admin info to request
        req.admin = {
            adminId: decoded.adminId,
            email: decoded.email,
        };

        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired. Please log in again.',
            });
        }

        return res.status(401).json({
            success: false,
            message: 'Invalid token.',
        });
    }
};

module.exports = { adminAuth };
