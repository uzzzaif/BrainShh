const validateJournal = (req, res, next) => {
  const { entry } = req.body;
  if (!entry || typeof entry !== 'string') {
    return res.status(400).json({ error: 'Journal entry is required and must be a string.' });
  }
  if (entry.length > 5000) {
    return res.status(400).json({ error: 'Journal entry must be under 5000 characters.' });
  }
  next();
};

const validateMood = (req, res, next) => {
  const { mood } = req.body;
  const validMoods = ['happy', 'calm', 'neutral', 'sad', 'stressed'];
  if (!mood || !validMoods.includes(mood)) {
    return res.status(400).json({ error: `Valid moods are: ${validMoods.join(', ')}.` });
  }
  next();
};

const validateChat = (req, res, next) => {
  const { message } = req.body;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required and must be a string.' });
  }
  if (message.length > 2000) {
    return res.status(400).json({ error: 'Message must be under 2000 characters.' });
  }
  next();
};

module.exports = { validateJournal, validateMood, validateChat };
