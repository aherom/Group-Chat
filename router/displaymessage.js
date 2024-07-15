const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

const contdisplaymessage = require('../controler/contdisplaymessage')

router.use('/messages/:groupId', authenticateToken,contdisplaymessage.displaymessage );

module.exports = router;
