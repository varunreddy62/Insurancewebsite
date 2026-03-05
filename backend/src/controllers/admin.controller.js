'use strict';

const firestoreService = require('../services/firestore.service');

/**
 * GET /admin/dashboard
 * Return lead counts grouped by status.
 */
const getDashboardStats = async (req, res, next) => {
    try {
        const stats = await firestoreService.getLeadStats();

        return res.json({
            success: true,
            data: stats,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * GET /admin/profile
 * Return the currently authenticated admin's profile.
 */
const getProfile = async (req, res, next) => {
    try {
        const admin = await firestoreService.getAdminById(req.admin.adminId);

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'Admin not found.',
            });
        }

        // Never return the password hash
        const { passwordHash, ...safeAdmin } = admin;

        return res.json({
            success: true,
            data: safeAdmin,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { getDashboardStats, getProfile };
