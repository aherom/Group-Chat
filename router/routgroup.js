const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const contgroup = require('../controler/contgroup');

router.use('/group', authenticateToken, contgroup.newgroup);

router.use('/list', authenticateToken, contgroup.listGroups);
module.exports = router;
