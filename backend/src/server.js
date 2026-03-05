'use strict';

const env = require('./config/env');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

// Routes
const authRoutes = require('./routes/auth.routes');
const { publicRouter: publicLeadRoutes, adminRouter: adminLeadRoutes } = require('./routes/lead.routes');
const adminRoutes = require('./routes/admin.routes');

// Error handlers
const { errorHandler, notFoundHandler } = require('./middleware/error.middleware');

const app = express();

// ══════════════════════════════════════════════════════════════
// Security Middleware
// ══════════════════════════════════════════════════════════════
app.use(helmet());

app.use(cors({
    origin: env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ══════════════════════════════════════════════════════════════
// Body Parsing
// ══════════════════════════════════════════════════════════════
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ══════════════════════════════════════════════════════════════
// Health Check
// ══════════════════════════════════════════════════════════════
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Insurance API is running',
        timestamp: new Date().toISOString(),
    });
});

// ══════════════════════════════════════════════════════════════
// Public Routes
// ══════════════════════════════════════════════════════════════

// POST /api/leads
app.use('/api/leads', publicLeadRoutes);

// ══════════════════════════════════════════════════════════════
// Admin Routes
// ══════════════════════════════════════════════════════════════

// POST /admin/login
app.use('/admin', authRoutes);

// GET  /admin/leads
// GET  /admin/leads/:id
// PATCH /admin/leads/:id/status
// POST /admin/leads/:id/call-log
app.use('/admin/leads', adminLeadRoutes);

// GET /admin/dashboard
// GET /admin/profile
app.use('/admin', adminRoutes);

// ══════════════════════════════════════════════════════════════
// Error Handling
// ══════════════════════════════════════════════════════════════
app.use(notFoundHandler);
app.use(errorHandler);

// ══════════════════════════════════════════════════════════════
// Start Server
// ══════════════════════════════════════════════════════════════
app.listen(env.PORT, () => {
    console.log(`\n🚀 Insurance API running on http://localhost:${env.PORT}`);
    console.log(`🔐 Admin login:  POST /admin/login`);
    console.log(`📋 Public leads: POST /api/leads`);
    console.log(`📊 Admin leads:  GET  /admin/leads`);
    console.log(`🌍 Environment:  ${env.NODE_ENV}\n`);
});

module.exports = app;
