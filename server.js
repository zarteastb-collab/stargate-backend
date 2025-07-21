// server.js

import express from 'express';
import dotenv from 'dotenv';
import path from 'path'; // <-- Import the path module
import { fileURLToPath } from 'url'; // <-- Import for ES modules
import apiRouter from './routes/api.js';

// Setup for ES module __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- UPDATED SECTION ---
// Serve static files (like index.html) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// When a user visits the root URL, send them the dashboard page
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// --- END UPDATED SECTION ---

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});