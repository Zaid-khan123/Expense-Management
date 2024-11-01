// routes/reportingRoute.js
const express = require('express');
const router = express.Router();
const { getAdminReport, getUserReport, getFilteredExpenses } = require('../controllers/reportingController');

router.post('/admin-report', getAdminReport); // For admin overview report
router.post('/user-report', getUserReport);   // For user overview report
router.post('/filtered-expenses', getFilteredExpenses); // For fetching filtered expenses

module.exports = router;
