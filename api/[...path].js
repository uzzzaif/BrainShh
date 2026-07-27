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

function getPathSegments(req) {
  const raw = req.query.path;
  if (!raw) return [];
  return Array.isArray(raw) ? raw : [raw];
}

function handleRequest(req, res) {
  const segments = getPathSegments(req);
  const route = `/${segments.join('/')}`;

  if (route === '/health') {
    return res.status(200).json({ status: 'ok', port: 8080, stateless: true, runtime: 'vercel' });
  }

  if (route === '/chat') {
    const { message } = req.method === 'POST' ? req.body || {} : req.query;
    return res.status(200).json(buildMockResponse(message));
  }

  if (route === '/affirmation') {
    const index = Math.floor(Date.now() / 86400000) % affirmations.length;
    return res.status(200).json({ affirmation: affirmations[index] });
  }

  if (route === '/tip') {
    const index = Math.floor(Date.now() / 3600000) % wellnessTips.length;
    return res.status(200).json({ tip: wellnessTips[index] });
  }

  if (route === '/goal') {
    const index = Math.floor(Date.now() / 86400000) % dailyGoals.length;
    return res.status(200).json({ goal: dailyGoals[index] });
  }

  if (route === '/mood' && req.method === 'POST') {
    const { mood } = req.body || {};
    return res.status(200).json({ success: true, mood: mood || null, message: 'Mood recorded locally by the client.' });
  }

  if (route === '/mood/history') {
    return res.status(200).json([]);
  }

  if (route === '/journal' && req.method === 'POST') {
    const { entry } = req.body || {};
    const normalizedEntry = String(entry || '').trim();

    return res.status(200).json({
      summary: normalizedEntry || 'Your journal entry was received.',
      detectedEmotions: normalizedEntry ? ['reflection'] : [],
      copingSuggestion: 'Take a deep breath and reflect on this moment.',
    });
  }

  return res.status(404).json({ error: 'Not found' });
}

module.exports = (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  return handleRequest(req, res);
};
