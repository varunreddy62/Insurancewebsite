'use strict';

const { db, admin } = require('../config/firebase');

// ── Collection references ────────────────────────────────────
const adminsCol = db.collection('admins');
const leadsCol = db.collection('leads');
const loginLogsCol = db.collection('login_logs');

// ══════════════════════════════════════════════════════════════
// ADMIN OPERATIONS
// ══════════════════════════════════════════════════════════════

/**
 * Find an admin document by email.
 * @param {string} email
 * @returns {Promise<{ id: string, ...data } | null>}
 */
const findAdminByEmail = async (email) => {
    const snapshot = await adminsCol.where('email', '==', email).limit(1).get();
    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
};

/**
 * Create a new admin document.
 * @param {{ name: string, email: string, passwordHash: string }} data
 * @returns {Promise<{ id: string }>}
 */
const createAdmin = async (data) => {
    const docRef = await adminsCol.add({
        name: data.name,
        email: data.email,
        passwordHash: data.passwordHash,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    return { id: docRef.id };
};

/**
 * Get admin by document ID.
 * @param {string} adminId
 * @returns {Promise<{ id: string, ...data } | null>}
 */
const getAdminById = async (adminId) => {
    const doc = await adminsCol.doc(adminId).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
};

/**
 * Log a successful login event.
 * @param {string} adminId
 * @param {string} ip
 */
const logLogin = async (adminId, ip) => {
    await loginLogsCol.add({
        adminId,
        ip: ip || 'unknown',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
};

// ══════════════════════════════════════════════════════════════
// LEAD OPERATIONS
// ══════════════════════════════════════════════════════════════

/**
 * Create a new lead document.
 * @param {object} data – Lead payload (fullName, mobile, insuranceType, details)
 * @returns {Promise<{ id: string, ...savedData }>}
 */
const createLead = async (data) => {
    const leadData = {
        fullName: data.fullName,
        mobile: data.mobile,
        insuranceType: data.insuranceType,
        details: data.details || {},
        status: 'new',
        callLogs: [],
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await leadsCol.add(leadData);
    return { id: docRef.id, ...leadData };
};

/**
 * Retrieve all leads, sorted by createdAt descending.
 * Optional status filter.
 * @param {{ status?: string }} [filters]
 * @returns {Promise<Array<{ id: string, ...data }>>}
 */
const getAllLeads = async (filters = {}) => {
    let query = leadsCol.orderBy('createdAt', 'desc');

    if (filters.status) {
        query = query.where('status', '==', filters.status);
    }

    const snapshot = await query.get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

/**
 * Get a single lead by document ID.
 * @param {string} leadId
 * @returns {Promise<{ id: string, ...data } | null>}
 */
const getLeadById = async (leadId) => {
    const doc = await leadsCol.doc(leadId).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
};

/**
 * Update the status of a lead.
 * @param {string} leadId
 * @param {string} status – One of: new, contacted, converted, rejected
 */
const updateLeadStatus = async (leadId, status) => {
    const docRef = leadsCol.doc(leadId);
    const doc = await docRef.get();
    if (!doc.exists) return null;

    await docRef.update({ status });
    return { id: doc.id, ...doc.data(), status };
};

/**
 * Append a call-log entry to a lead's callLogs array.
 * @param {string} leadId
 * @param {{ adminId: string, notes: string, callStatus: string }} logEntry
 */
const addCallLog = async (leadId, logEntry) => {
    const docRef = leadsCol.doc(leadId);
    const doc = await docRef.get();
    if (!doc.exists) return null;

    const entry = {
        adminId: logEntry.adminId,
        notes: logEntry.notes,
        callStatus: logEntry.callStatus,
        createdAt: new Date(),
    };

    // serverTimestamp() cannot be used inside arrayUnion — use manual push
    const data = doc.data();
    const callLogs = data.callLogs || [];
    callLogs.push(entry);

    await docRef.update({ callLogs });

    return { id: doc.id, ...data, callLogs };
};

/**
 * Count leads grouped by status.
 * @returns {Promise<{ new: number, contacted: number, converted: number, rejected: number, total: number }>}
 */
const getLeadStats = async () => {
    const snapshot = await leadsCol.get();
    const stats = { new: 0, contacted: 0, converted: 0, rejected: 0, total: 0 };

    snapshot.docs.forEach((doc) => {
        const data = doc.data();
        stats.total += 1;
        if (stats.hasOwnProperty(data.status)) {
            stats[data.status] += 1;
        }
    });

    return stats;
};

/**
 * Delete a single lead by document ID.
 * @param {string} leadId
 * @returns {Promise<boolean>}
 */
const deleteLead = async (leadId) => {
    const docRef = leadsCol.doc(leadId);
    const doc = await docRef.get();
    if (!doc.exists) return false;

    await docRef.delete();
    return true;
};

module.exports = {
    // Admin
    findAdminByEmail,
    createAdmin,
    getAdminById,
    logLogin,

    // Leads
    createLead,
    getAllLeads,
    getLeadById,
    updateLeadStatus,
    addCallLog,
    getLeadStats,
    deleteLead,
};
