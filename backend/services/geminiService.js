const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('../config/env');

const genAI = new GoogleGenerativeAI(config.geminiApiKey);

const systemPrompt = `You are BrainShh, a gentle and empathetic mental wellness companion. Your purpose is to listen, support, and encourage positive mental health habits.

Guidelines:
- NEVER diagnose diseases, replace therapists, or prescribe medicine.
- Listen empathetically and validate the user's feelings.
- Provide emotional support and encouragement.
- Suggest breathing exercises, journaling, or healthy habits when appropriate.
- Encourage seeking professional help when the user expresses serious distress.
- Keep responses concise and warm.
- Use simple, comforting language.
- Do not use medical terminology or make clinical assessments.`;

// Try a sequence of candidate models until one works. The primary model name can
// be configured via GEMINI_MODEL; fallbacks include common available models.
const fallbackModels = [config.geminiModel, 'gemini-1.0', 'models/text-bison-001'];

const chatWithGemini = async (message, conversationHistory = []) => {
  let lastErr = null;

  for (const candidate of fallbackModels) {
    if (!candidate) continue;
    try {
      const model = genAI.getGenerativeModel({ model: candidate });

      const chat = model.startChat({
        systemInstruction: {
          parts: [{ text: systemPrompt }],
        },
        history: conversationHistory.map((msg) => ({
          role: msg.isUser ? 'user' : 'model',
          parts: [{ text: msg.message }],
        })),
      });

      const result = await chat.sendMessage(message);
      const response = result.response;
      return response.text();
    } catch (err) {
      lastErr = err;
      console.error(`Gemini model attempt failed for '${candidate}':`, err && err.message ? err.message : err);
      // try next candidate
    }
  }

  // If we reach here, no model succeeded — throw the last error.
  throw lastErr || new Error('No generative model available');
};

module.exports = { chatWithGemini };
