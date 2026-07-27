const express = require('express');
const router = express.Router();
const { chatLimiter } = require('../middleware/rateLimiter');
const { chat } = require('../controllers/chatController');

router.post('/', chatLimiter, chat);

module.exports = router;
