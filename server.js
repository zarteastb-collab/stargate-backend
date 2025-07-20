// server.js

import express from 'express';
import dotenv from 'dotenv';
import apiRouter from './routes/api.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root endpoint
app.get('/', (_req, res) => {
  res.json({ message: 'Welcome to the Stargate Backend API!' });
});

// API routes
app.use('/api', apiRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
