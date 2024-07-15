const express = require('express');
const contjoinrequest = require('../controler/contjoinrequest');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.use('/user', authenticateToken,contjoinrequest.addUser);

module.exports = router;