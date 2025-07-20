// routes/api.js

import { Router } from 'express';
import genAI from '../services/googleai.js';

const router = Router();

router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Select the Gemini model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Send the user's message to the model
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    // Send the model's response back to the client

// Send a differently structured response
res.json({
  ai_reply: text,
  timestamp: new Date().toISOString()
});

  } catch (error) {
    console.error('Error with Google AI API:', error);
    res.status(500).json({ error: 'Failed to get response from Google AI' });
  }
});

export default router;