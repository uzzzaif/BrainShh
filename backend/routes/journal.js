const express = require('express');
const router = express.Router();
const { validateJournal } = require('../middleware/validate');
const { sanitizeInput } = require('../middleware/sanitize');
const { createJournal } = require('../controllers/journalController');

router.post('/', sanitizeInput, validateJournal, createJournal);

module.exports = router;
