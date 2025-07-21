// routes/api.js

import { Router } from 'express';
import genAI from '../services/googleai.js';

const router = Router();

// This is your existing route for the AI chat
router.post('/chat', async (req, res) => {
  // ... existing chat logic
});

// --- ADD THIS NEW ROUTE ---
// This route will receive the data from your HTML form
router.post('/save-preferences', (req, res) => {
  const { persona } = req.body;

  // For now, we'll just log it to the server's console
  console.log('Received persona:', persona);

  // Send a confirmation message back to the frontend
  res.json({ message: 'Preferences saved successfully!' });
});
// --- END NEW ROUTE ---

export default router;