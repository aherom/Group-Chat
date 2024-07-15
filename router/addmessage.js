const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const contaddmessage = require('../controler/contaddmessage');

const router = express.Router();

router.use('/addMessage', authenticateToken,contaddmessage.addMessage );

module.exports = router;