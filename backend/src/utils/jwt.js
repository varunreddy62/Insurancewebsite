'use strict';

const jwt = require('jsonwebtoken');
const env = require('../config/env');

/**
 * Generate a signed JWT for an admin user.
 * @param {{ adminId: string, email: string }} payload
 * @returns {string} signed JWT
 */
const generateToken = (payload) => {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '8h' });
};

/**
 * Verify and decode a JWT.
 * @param {string} token
 * @returns {{ adminId: string, email: string }} decoded payload
 * @throws {JsonWebTokenError|TokenExpiredError}
 */
const verifyToken = (token) => {
    return jwt.verify(token, env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
