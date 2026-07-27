const rateLimit = require('express-rate-limit');
const config = require('../config/env');

const generalLimiter = rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: config.rateLimitMax,
  message: { error: 'Too many requests from this IP, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const chatLimiter = rateLimit({
  windowMs: 60000,
  max: 20,
  message: { error: 'Too many chat messages, please wait a moment.' },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { generalLimiter, chatLimiter };
