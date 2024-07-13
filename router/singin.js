const express = require('express');

const contsingin = require('../controler/contsingin')

const router = express.Router();

router.post('/sigin',contsingin.sigin );

module.exports = router;
