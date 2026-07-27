const express = require('express');
const router = express.Router();
const { getRandomAffirmation, getRandomTip, getDailyGoal } = require('../controllers/wellnessController');

router.get('/affirmation', getRandomAffirmation);
router.get('/tip', getRandomTip);
router.get('/goal', getDailyGoal);

module.exports = router;
