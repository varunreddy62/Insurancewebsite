'use strict';

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { adminAuth } = require('../middleware/auth.middleware');
const { adminApiLimiter } = require('../middleware/rateLimit.middleware');

// All admin routes require authentication and rate limiting
router.use(adminAuth);
router.use(adminApiLimiter);

// GET /admin/dashboard
router.get('/dashboard', adminController.getDashboardStats);

// GET /admin/profile
router.get('/profile', adminController.getProfile);

module.exports = router;
