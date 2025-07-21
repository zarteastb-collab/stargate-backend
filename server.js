// server.js

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRouter from './routes/api.js';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

// Load environment variables
dotenv.config();

// --- NEW: Check for required environment variables ---
const requiredEnvVars = ['GOOGLE_API_KEY', 'GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'SESSION_SECRET'];
for (const varName of requiredEnvVars) {
  if (!process.env[varName]) {
    console.error(`FATAL ERROR: Environment variable ${varName} is not set. Please check your .env file.`);
    process.exit(1); // Exit with a failure code
  }
}

// --- NEW: Catch any unhandled errors that cause silent crashes ---
process.on('uncaughtException', (err, origin) => {
  console.error('FATAL UNCAUGHT EXCEPTION:', err);
  console.error('Exception origin:', origin);
  process.exit(1);
});


// Setup for ES module __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// In-memory user database (for demonstration purposes)
const users = {};

// --- Middleware Setup ---
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // In production, use 'auto' or true with HTTPS
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from 'public' and 'node_modules'
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));


// --- Passport.js Configuration ---
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    console.log("Google profile received:", profile);
    users[profile.id] = { id: profile.id, name: profile.displayName, email: profile.emails[0].value, photo: profile.photos[0].value };
    return done(null, users[profile.id]);
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, users[id]);
});


// --- Routes ---
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    console.log('Successfully authenticated! User:', req.user.name);
    console.log('Redirecting to /');
    res.redirect('/');
  }
);

app.get('/logout', (req, res, next) => {
    req.logout(err => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

app.use('/api', apiRouter);


// --- Start Server ---
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

