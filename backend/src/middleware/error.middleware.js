'use strict';

const env = require('../config/env');

/**
 * Centralized Express error handler.
 * Must be registered AFTER all routes.
 *
 * - Development: returns full error details
 * - Production: never exposes stack traces
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    console.error('❌ Unhandled error:', err);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';

    const response = {
        success: false,
        message: statusCode === 500 ? 'Internal server error' : message,
    };

    // Expose details only in development
    if (env.NODE_ENV === 'development') {
        response.error = err.message;
        response.stack = err.stack;
    }

    res.status(statusCode).json(response);
};

/**
 * 404 handler for undefined routes.
 */
const notFoundHandler = (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`,
    });
};

module.exports = { errorHandler, notFoundHandler };
