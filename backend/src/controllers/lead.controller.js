'use strict';

const firestoreService = require('../services/firestore.service');
const telegramService = require('../services/telegram.service');

// Valid insurance types
const VALID_INSURANCE_TYPES = ['auto', 'health', 'life'];
// Valid lead statuses
const VALID_STATUSES = ['new', 'contacted', 'converted', 'rejected'];

/**
 * POST /api/leads
 * Create a new lead (public).
 */
const createLead = async (req, res, next) => {
    try {
        const { fullName, mobile, insuranceType, details } = req.body;

        // ── Create lead via service ───────────────────────────
        const lead = await firestoreService.createLead({
            fullName,
            mobile,
            insuranceType,
            details: details || {},
        });

        // ── Trigger Telegram notification (non-blocking) ──────
        telegramService.sendLeadNotification(lead).catch((err) => {
            console.error('Telegram notification error:', err.message);
        });

        return res.status(201).json({
            success: true,
            message: 'Lead created successfully.',
            data: { id: lead.id },
        });
    } catch (err) {
        next(err);
    }
};

/**
 * GET /admin/leads
 * Return all leads sorted by createdAt desc.
 */
const getAllLeads = async (req, res, next) => {
    try {
        const { status } = req.query;
        const leads = await firestoreService.getAllLeads({ status });

        return res.json({
            success: true,
            data: leads,
            total: leads.length,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * GET /admin/leads/:id
 * Return a single lead.
 */
const getLeadById = async (req, res, next) => {
    try {
        const lead = await firestoreService.getLeadById(req.params.id);

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: 'Lead not found.',
            });
        }

        return res.json({
            success: true,
            data: lead,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * PATCH /admin/leads/:id/status
 * Update the status of a lead.
 */
const updateLeadStatus = async (req, res, next) => {
    try {
        const { status } = req.body;

        const lead = await firestoreService.updateLeadStatus(req.params.id, status);

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: 'Lead not found.',
            });
        }

        return res.json({
            success: true,
            message: 'Lead status updated.',
            data: lead,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * POST /admin/leads/:id/call-log
 * Add a call-log entry to a lead.
 */
const addCallLog = async (req, res, next) => {
    try {
        const { notes, callStatus } = req.body;

        const lead = await firestoreService.addCallLog(req.params.id, {
            adminId: req.admin.adminId,
            notes,
            callStatus,
        });

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: 'Lead not found.',
            });
        }

        return res.json({
            success: true,
            message: 'Call log added.',
            data: lead,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * DELETE /admin/leads/:id
 * Delete a lead.
 */
const deleteLead = async (req, res, next) => {
    try {
        const success = await firestoreService.deleteLead(req.params.id);

        if (!success) {
            return res.status(404).json({
                success: false,
                message: 'Lead not found.',
            });
        }

        return res.json({
            success: true,
            message: 'Lead deleted successfully.',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createLead,
    getAllLeads,
    getLeadById,
    updateLeadStatus,
    addCallLog,
    deleteLead,
};
