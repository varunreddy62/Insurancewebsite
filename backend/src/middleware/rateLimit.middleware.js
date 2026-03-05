'use strict';

const rateLimit = require('express-rate-limit');

/**
 * Rate limiter for the login endpoint.
 * 5 attempts per 15-minute window.
 */
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Too many login attempts. Please try again after 15 minutes.',
    },
});

/**
 * Rate limiter for public API endpoints.
 * 100 requests per 15-minute window.
 */
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Too many requests. Please try again later.',
    },
});

/**
 * Rate limiter for admin API endpoints.
 * 1000 requests per 15-minute window to prevent abuse by authenticated users.
 */
const adminApiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Too many requests. Please try again later.',
    },
});

module.exports = { loginLimiter, apiLimiter, adminApiLimiter };
