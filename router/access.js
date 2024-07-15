const express = require('express');
const contgroup = require('../controler/contaccess');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.use('/access', authenticateToken, contgroup.accessGroup);
//router.use('/user', authenticateToken, contgroup.addUser);

module.exports = router;