'use strict';

/**
 * Generic validation middleware using Zod.
 * Validates request body, query, or params against a Zod schema.
 */
const validateRequest = (schema, property = 'body') => {
    return (req, res, next) => {
        try {
            // Parse and validate the request property (e.g., req.body)
            // This also strips unknown keys if the schema is strict, or applies defaults
            const validData = schema.parse(req[property]);

            // Re-assign the validated data to the request object
            req[property] = validData;

            next();
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed.',
                errors: error.errors,
            });
        }
    };
};

module.exports = { validateRequest };
