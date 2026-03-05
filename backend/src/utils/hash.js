'use strict';

const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 12;

/**
 * Hash a plaintext password.
 * @param {string} password
 * @returns {Promise<string>} bcrypt hash
 */
const hashPassword = async (password) => {
    return bcrypt.hash(password, SALT_ROUNDS);
};

/**
 * Compare a plaintext password with a bcrypt hash.
 * @param {string} password
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
const comparePassword = async (password, hash) => {
    return bcrypt.compare(password, hash);
};

module.exports = { hashPassword, comparePassword };
