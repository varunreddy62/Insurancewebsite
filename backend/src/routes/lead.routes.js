'use strict';

const express = require('express');
const publicRouter = express.Router();
const adminRouter = express.Router();

const leadController = require('../controllers/lead.controller');
const { adminAuth } = require('../middleware/auth.middleware');
const { apiLimiter, adminApiLimiter } = require('../middleware/rateLimit.middleware');
const { validateRequest } = require('../middleware/validation.middleware');
const { createLeadSchema, updateLeadStatusSchema, addCallLogSchema } = require('../validations/lead.validation');

// ══════════════════════════════════════════════════════════════
// Public Routes — mounted at /api/leads
// ══════════════════════════════════════════════════════════════

// POST /api/leads — create a new lead
publicRouter.post('/', apiLimiter, validateRequest(createLeadSchema), leadController.createLead);

// ══════════════════════════════════════════════════════════════
// Admin Routes — mounted at /admin/leads
// ══════════════════════════════════════════════════════════════

// All admin lead routes require authentication and rate limiting
adminRouter.use(adminAuth);
adminRouter.use(adminApiLimiter);

// GET /admin/leads
adminRouter.get('/', leadController.getAllLeads);

// GET /admin/leads/:id
adminRouter.get('/:id', leadController.getLeadById);

// PATCH /admin/leads/:id/status
adminRouter.patch('/:id/status', validateRequest(updateLeadStatusSchema), leadController.updateLeadStatus);

// POST /admin/leads/:id/call-log
adminRouter.post('/:id/call-log', validateRequest(addCallLogSchema), leadController.addCallLog);

// DELETE /admin/leads/:id
adminRouter.delete('/:id', leadController.deleteLead);

module.exports = { publicRouter, adminRouter };
