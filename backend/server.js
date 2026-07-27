const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const config = require('./config/env');
const { generalLimiter } = require('./middleware/rateLimiter');
const { errorHandler } = require('./middleware/errorHandler');
const { sanitizeInput } = require('./middleware/sanitize');
const chatRoute = require('./routes/chat');
const journalRoute = require('./routes/journal');
const moodRoute = require('./routes/mood');
const wellnessRoute = require('./routes/wellness');
const { getRandomAffirmation, getRandomTip, getDailyGoal } = require('./controllers/wellnessController');

const app = express();

// Middleware
// Configure Helmet with a Content Security Policy that allows trusted third-party
// script hosts used by the frontend (Chart.js via jsdelivr).
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'https://cdn.jsdelivr.net'],
        // Explicitly include script-src-elem so modern browsers use it instead of
        // the script-src fallback when present.
        scriptSrcElem: ["'self'", 'https://cdn.jsdelivr.net'],
        connectSrc: ["'self'", 'https://cdn.jsdelivr.net'],
        imgSrc: ["'self'", 'data:'],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      },
    },
  })
);
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(sanitizeInput);
app.use(generalLimiter);

// Serve frontend static files from dist/
app.use(express.static(path.join(__dirname, '..', 'dist')));

// API Routes
app.use('/api/chat', chatRoute);
app.use('/api/journal', journalRoute);
app.use('/api/mood', moodRoute);
app.use('/api/wellness', wellnessRoute);

// Direct wellness endpoints (frontend-compatible paths)
app.get('/api/affirmation', (req, res) => {
  res.json({ affirmation: getRandomAffirmation() });
});
app.get('/api/tip', (req, res) => {
  res.json({ tip: getRandomTip() });
});
app.get('/api/goal', (req, res) => {
  res.json({ goal: getDailyGoal() });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// SPA fallback — serve index.html for any unmatched routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

// Error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`BrainShh server running on port ${PORT}`);
});

module.exports = app;
