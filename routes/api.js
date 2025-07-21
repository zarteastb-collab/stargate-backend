// routes/api.js

import { Router } from 'express';
import genAI from '../services/googleai.js';

const router = Router();

let userPersona = "You are a helpful and concise assistant.";

// Endpoint to check if a user is logged in and get their data
router.get('/get-user', (req, res) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

// AI Chat endpoint
router.post('/chat', async (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
    const prompt = `${userPersona} \n\nUser's message: "${message}"`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ response: text });
  } catch (error) {
    console.error('Error with Google AI API:', error);
    res.status(500).json({ error: 'Failed to get response from Google AI', details: error.message });
  }
});

export default router;