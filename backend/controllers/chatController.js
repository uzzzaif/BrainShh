const { chatWithGemini } = require('../services/geminiService');
const { detectCrisis, crisisResponse } = require('../utils/crisisDetector');

const chat = async (req, res, next) => {
  try {
    const { message } = req.body;

    if (detectCrisis(message)) {
      return res.json({
        response: crisisResponse,
        isCrisis: true,
      });
    }

    try {
      const response = await chatWithGemini(message, []);
      return res.json({ response, isCrisis: false });
    } catch (err) {
      console.error('Gemini chat failed:', err && err.message ? err.message : err);
      // Fallback friendly reply so the UI remains usable even when the AI backend fails
      const fallback = "I'm having trouble connecting to the AI service right now. Please try again in a moment, or rephrase your message.";
      return res.json({ response: fallback, isCrisis: false });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { chat };
