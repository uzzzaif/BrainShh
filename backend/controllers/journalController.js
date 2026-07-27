const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('../config/env');

const genAI = new GoogleGenerativeAI(config.geminiApiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const journalPrompt = (entry) => `You are a gentle mental wellness assistant. A user has written the following journal entry:

"${entry}"

Please respond in JSON format with exactly these three fields:
1. "summary": A short, kind summary of what the user wrote (2-3 sentences)
2. "detectedEmotions": An array of emotions you sense from the entry (use words like joy, sadness, anxiety, gratitude, anger, hope, etc.)
3. "copingSuggestion": ONE gentle, actionable coping suggestion (1 sentence). Suggest breathing, journaling, a short walk, or talking to someone they trust.

Do not include any text outside the JSON.`;

const analyzeJournal = async (entry) => {
  try {
    const chat = model.startChat({
      systemInstruction: {
        role: 'system',
        parts: [{ text: 'You are a helpful assistant that always responds with valid JSON only.' }],
      },
    });
    const result = await chat.sendMessage(journalPrompt(entry));
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*?\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch {
    // Fallback if AI analysis fails
  }
  return {
    summary: entry,
    detectedEmotions: ['reflection'],
    copingSuggestion: 'Take a deep breath and reflect on this moment.',
  };
};

const createJournal = async (req, res, next) => {
  try {
    const { entry } = req.body;

    const analysis = await analyzeJournal(entry);

    res.status(201).json(analysis);
  } catch (error) {
    next(error);
  }
};

module.exports = { createJournal };
