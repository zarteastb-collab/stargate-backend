// server.js

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRouter from './routes/api.js';

// --- NEW IMPORTS FOR AUTHENTICATION ---
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

// ... setup for __dirname, dotenv, app, PORT ...

// --- NEW: PASSPORT AND SESSION SETUP ---
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// TODO: Add passport.serializeUser and passport.deserializeUser functions here

// TODO: Configure the GoogleStrategy for Passport here

// --- END NEW SECTION ---


app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// --- NEW AUTHENTICATION ROUTES ---
// 1. The route to start the Google Sign-In process
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

// 2. The callback route that Google redirects to after sign-in
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
// --- END NEW ROUTES ---


app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});