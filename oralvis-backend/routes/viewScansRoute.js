const express = require('express');
const router = express.Router();
const viewScansDentist = require('../controllers/viewScansDentist');
const {authenticateDentist} = require('../middleware/authMiddleware');

router.get('/viewScans', authenticateDentist, viewScansDentist);

module.exports = router;