'use strict';

const { z } = require('zod');

const VALID_INSURANCE_TYPES = ['auto', 'health', 'life'];
const VALID_STATUSES = ['new', 'contacted', 'converted', 'rejected'];

const createLeadSchema = z.object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters.'),
    mobile: z.string().regex(/^\d{10}$/, 'Mobile must be a valid 10-digit number.'),
    insuranceType: z.enum(VALID_INSURANCE_TYPES, {
        errorMap: () => ({ message: `Insurance type must be one of: ${VALID_INSURANCE_TYPES.join(', ')}` })
    }),
    details: z.any().optional(), // allow any object structure for details
});

const updateLeadStatusSchema = z.object({
    status: z.enum(VALID_STATUSES, {
        errorMap: () => ({ message: `Status must be one of: ${VALID_STATUSES.join(', ')}` })
    }),
});

const addCallLogSchema = z.object({
    notes: z.string().min(1, 'Notes are required and cannot be empty.'),
    callStatus: z.string().min(1, 'Call status is required.'),
});

module.exports = {
    createLeadSchema,
    updateLeadStatusSchema,
    addCallLogSchema,
};
