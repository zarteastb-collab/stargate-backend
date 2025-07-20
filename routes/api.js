// routes/api.js

import { Router } from 'express';
import openai from '../services/openai.js';

const router = Router();

// Example route: GET /api/
router.get('/', (_req, res) => {
  res.json({ message: 'Welcome to the API!' });
});

// Add your OpenAI-related routes here
// Example: POST /api/chat
router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: message }],
      model: 'gpt-3.5-turbo',
    });

    res.json({ response: completion.choices[0].message.content });

  } catch (error) {
    console.error('Error with OpenAI API:', error);
    res.status(500).json({ error: 'Failed to get response from OpenAI' });
  }
});

export default router;
