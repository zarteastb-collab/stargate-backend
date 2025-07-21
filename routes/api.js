// routes/api.js

import { Router } from 'express';
import genAI from '../services/googleai.js';

const router = Router();

// 1. Variable to store the user's persona preference
let userPersona = "You are a helpful and concise assistant."; // A default persona

// This route receives the data from your HTML form
router.post('/save-preferences', (req, res) => {
  const { persona } = req.body;
  if (persona) {
    // 2. Update the variable when preferences are saved
    userPersona = persona; 
    console.log('User persona updated to:', userPersona);
    res.json({ message: 'Preferences saved successfully!' });
  } else {
    res.status(400).json({ message: 'No persona provided.' });
  }
});

// This is your existing route for the AI chat
router.post('/chat', async (req, res) => {
  try {
    if (!process.env.GOOGLE_API_KEY) {
      throw new Error("GOOGLE_API_KEY is not set in the .env file.");
    }

    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

    // 3. Use the stored persona in the AI prompt
    const prompt = `${userPersona} \n\nUser's message: "${message}"`;
    
    console.log('Sending prompt to AI:', prompt); // Log the full prompt for debugging

    const result = await model.generateContent(prompt);
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