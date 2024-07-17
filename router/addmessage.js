const express = require('express');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

module.exports = (io) => {
    const contaddmessage = require('../controler/contaddmessage')(io);

    router.post('/addMessage', authenticateToken, contaddmessage.addMessage);

    return router;
};
