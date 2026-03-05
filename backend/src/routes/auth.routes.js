'use strict';

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { loginLimiter } = require('../middleware/rateLimit.middleware');
const { validateRequest } = require('../middleware/validation.middleware');
const { loginSchema } = require('../validations/auth.validation');

// POST /admin/login
router.post('/login', loginLimiter, validateRequest(loginSchema), authController.login);

module.exports = router;
