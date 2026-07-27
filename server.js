const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();
const PORT = 8080;
const distPath = path.join(__dirname, 'dist');
const hasDist = fs.existsSync(distPath) && fs.existsSync(path.join(distPath, 'index.html'));

const crisisKeywords = [
  'want to die',
  'kill myself',
  'end it all',
  'hurt myself',
  'suicide',
  'cannot go on',
  "can't go on",
];

const mockResponses = [
  {
    keywords: ['sad', 'down', 'depressed', 'lonely', 'hopeless'],
    response: "I'm sorry you're feeling this way. You don't have to carry it alone right now. Try one small thing: drink some water, take three slow breaths, and reach out to someone you trust.",
  },
  {
    keywords: ['anxious', 'anxiety', 'worried', 'panic', 'nervous'],
    response: "That sounds overwhelming, and it makes sense your mind feels busy. Let's slow it down together: notice five things you can see, relax your shoulders, and take one gentle breath at a time.",
  },
  {
    keywords: ['stress', 'stressed', 'overwhelmed', 'burnout', 'burned out'],
    response: "You're carrying a lot right now. If possible, pause for a moment, break the next task into one tiny step, and give yourself permission to rest without judgment.",
  },
  {
    keywords: ['angry', 'mad', 'frustrated', 'irritated'],
    response: "It sounds like something really got under your skin. Before responding, give yourself a short pause, unclench your jaw, and step away for a minute if you can.",
  },
];

const affirmations = [
  'You are allowed to take up space and move at your own pace.',
  'Small steps still count, especially on hard days.',
  'Your feelings are valid, and you do not have to solve everything at once.',
  'You deserve kindness from others and from yourself.',
  'Today is enough if you simply get through it gently.',
];

const wellnessTips = [
  'Take one slow breath in for four counts, then out for four counts.',
  'Step away from the screen for two minutes and relax your shoulders.',
  'Drink a glass of water before deciding your next task.',
  'Write down one thing that is within your control today.',
  'If everything feels heavy, focus on the next small step only.',
];

const dailyGoals = [
  'Take a 10-minute walk outside today.',
  'Send one supportive message to someone you trust.',
  'Write down three things that went well today.',
  'Pause for a mindful breathing break before dinner.',
  'Do one task that makes tomorrow easier.',
];

function buildMockResponse(message) {
  const normalized = String(message || '').toLowerCase();

  if (crisisKeywords.some((keyword) => normalized.includes(keyword))) {
    return {
      response:
        "I'm really glad you said that. Your safety matters most right now. Please contact emergency services or a trusted person immediately, and if you're in the U.S. or Canada call or text 988 for immediate crisis support.",
      isCrisis: true,
    };
  }

  const match = mockResponses.find((entry) => entry.keywords.some((keyword) => normalized.includes(keyword)));

  if (match) {
    return { response: match.response, isCrisis: false };
  }

  return {
    response:
      "I'm here with you. If you'd like, tell me a little more about what's on your mind, or name one thing that would feel a bit lighter right now.",
    isCrisis: false,
  };
}

app.use(cors());
app.use(express.json());

if (hasDist) {
  app.use(express.static(distPath));
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', port: PORT, stateless: true });
});

app.post('/api/chat', (req, res) => {
  const { message } = req.body || {};
  res.json(buildMockResponse(message));
});

app.get('/api/affirmation', (req, res) => {
  const index = Math.floor(Date.now() / 86400000) % affirmations.length;
  res.json({ affirmation: affirmations[index] });
});

app.get('/api/tip', (req, res) => {
  const index = Math.floor(Date.now() / 3600000) % wellnessTips.length;
  res.json({ tip: wellnessTips[index] });
});

app.get('/api/goal', (req, res) => {
  const index = Math.floor(Date.now() / 86400000) % dailyGoals.length;
  res.json({ goal: dailyGoals[index] });
});

app.post('/api/mood', (req, res) => {
  const { mood } = req.body || {};
  res.json({ success: true, mood: mood || null, message: 'Mood recorded locally by the client.' });
});

app.get('/api/mood/history', (req, res) => {
  res.json([]);
});

app.post('/api/journal', (req, res) => {
  res.json({ success: true, message: 'Journal entry accepted without server persistence.' });
});

if (hasDist) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.get('*', (req, res) => {
    res.status(200).json({
      status: 'ok',
      message: 'BrainShh backend is running without a built dist folder yet.',
    });
  });
}

app.listen(PORT, () => {
  console.log(`BrainShh server running on port ${PORT}`);
});

module.exports = app;
