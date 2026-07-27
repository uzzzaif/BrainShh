const dotenv = require('dotenv');

dotenv.config();

const config = {
  port: parseInt(process.env.PORT, 10) || 8080,
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  geminiModel: process.env.GEMINI_MODEL || 'gemini-1.5-pro',
  nodeEnv: process.env.NODE_ENV || 'development',
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 900000,
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX, 10) || 100,
};

module.exports = config;
