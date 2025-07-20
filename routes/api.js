// routes/api.js

import { Router } from 'express';
// Ensure this line correctly imports from googleai.js
import genAI from '../services/googleai.js';

const router = Router();

router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    res.json({ response: text });

  } catch (error) {
    console.error('Error with Google AI API:', error);
    res.status(500).json({ error: 'Failed to get response from Google AI' });
  }
});

export default router;