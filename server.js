// server.js

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRouter from './routes/api.js';

// Imports for Authentication
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

// Setup for ES module __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// --- Main Correction: Create the app variable before using it ---
const app = express();
const PORT = process.env.PORT || 3001;

// --- Middleware Setup ---

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// JSON and URL-encoded body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (like index.html) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// --- ADD THIS LINE ---
// Also serve files from the node_modules directory
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// --- TODO: Passport Configuration ---
// The functions to tell Passport how to handle user data will go here.
// TODO: Add passport.serializeUser and passport.deserializeUser
// TODO: Configure the GoogleStrategy for Passport


// --- Routes ---

// Root route to serve the dashboard page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Authentication routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to the main page.
    res.redirect('/');
  }
);

// API routes from routes/api.js
app.use('/api', apiRouter);


// --- Start Server ---
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});