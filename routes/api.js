// routes/api.js

import { Router } from 'express';
import genAI from '../services/googleai.js';

const router = Router();

router.post('/chat', async (req, res) => {
  try {
    if (!process.env.GOOGLE_API_KEY) {
      throw new Error("GOOGLE_API_KEY is not set in the .env file.");
    }

    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // UPDATED: Use a current model name
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    res.json({ response: text });

  } catch (error) {
    console.error('Error with Google AI API:', error);
    res.status(500).json({
      error: 'Failed to get response from Google AI',
      details: error.message 
    });
  }
});

export default router;