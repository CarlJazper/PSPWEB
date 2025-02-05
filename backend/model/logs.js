const mongoose = require('mongoose');

const logsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    timeIn: {
        type: Date,
        required: true,
        default: Date.now, 
    },
    timeOut: {
        type: Date,
        default: null, 
    },
    adminBranchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: () => new Date().setHours(0, 0, 0, 0),
    },
});

module.exports = mongoose.model('logs', logsSchema)