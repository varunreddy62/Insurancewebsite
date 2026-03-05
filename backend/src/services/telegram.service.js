'use strict';

const axios = require('axios');
const env = require('../config/env');

/**
 * Send a Telegram notification when a new lead is created.
 * Silently skips if Telegram credentials are not configured.
 *
 * @param {{ fullName: string, mobile: string, insuranceType: string }} lead
 */
const sendLeadNotification = async (lead) => {
    if (!env.TELEGRAM_TOKEN || !env.TELEGRAM_CHAT_ID) {
        console.log('ℹ️  Telegram not configured — skipping notification.');
        return;
    }

    const message = [
        '🚀 *New Insurance Lead*',
        '',
        `👤 Name: ${lead.fullName}`,
        `📱 Phone: ${lead.mobile}`,
        `🛡️ Type: ${lead.insuranceType}`,
        '',
        `🕐 ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`,
        '',
        `💻 [Admin Dashboard](${env.FRONTEND_URL || 'http://localhost:5173'}/control-panel-x7k9/dashboard)`
    ].join('\n');

    try {
        await axios.post(
            `https://api.telegram.org/bot${env.TELEGRAM_TOKEN}/sendMessage`,
            {
                chat_id: env.TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'Markdown',
            }
        );
        console.log('✅ Telegram notification sent.');
    } catch (err) {
        // Non-fatal — log and continue
        console.error(
            '❌ Telegram notification failed:',
            err.response?.data?.description || err.message
        );
    }
};

module.exports = { sendLeadNotification };
