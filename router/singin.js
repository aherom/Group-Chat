const express = require('express');
const contsingin = require('../controler/contsingin');
const contlogin = require('../controler/contlogin');

const router = express.Router();

router.post('/sigin', contsingin.sigin);
router.post('/login', contlogin.login);

module.exports = router;
