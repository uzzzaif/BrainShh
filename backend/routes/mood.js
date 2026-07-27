const express = require('express');
const router = express.Router();
const { validateMood } = require('../middleware/validate');
const { sanitizeInput } = require('../middleware/sanitize');
const { recordMood, getMoodHistory } = require('../controllers/moodController');

router.post('/', sanitizeInput, validateMood, recordMood);
router.get('/history', sanitizeInput, getMoodHistory);

module.exports = router;
