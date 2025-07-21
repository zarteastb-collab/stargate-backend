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

// --- NEW: Check for required environment variables ---
const requiredEnvVars = ['GOOGLE_API_KEY', 'GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'SESSION_SECRET'];
for (const varName of requiredEnvVars) {
  if (!process.env[varName]) {
    console.error(`FATAL ERROR: Environment variable ${varName} is not set. Please check your .env file.`);
    process.exit(1); // Exit with a failure code
  }
}

// --- NEW: Catch any unhandled errors that cause silent crashes ---
// This is critical for debugging server-side issues
process.on('uncaughtException', (err, origin) => {
  console.error('FATAL UNCAUGHT EXCEPTION:', err);
  console.error('Exception origin:', origin);
  // Log specific details if possible, e.g., for EADDRINUSE
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${err.port} is already in use.`);
  }
  process.exit(1);
});

// --- NEW: Catch unhandled promise rejections ---
process.on('unhandledRejection', (reason, promise) => {
  console.error('FATAL UNHANDLED REJECTION:', reason);
  console.error('Promise:', promise);
  // Optional: exit here if unhandled rejections should be fatal
  process.exit(1); 
});


const app = express();
const PORT = process.env.PORT || 3001; // Ensure this matches your desired port

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
    console.log("--- Passport Strategy Callback: Profile received ---");
    console.log("Profile ID:", profile.id);
    console.log("Profile Name:", profile.displayName);
    console.log("Profile Email:", profile.emails && profile.emails[0] ? profile.emails[0].value : 'N/A');
    // Ensure profile.photos[0].value exists before accessing
    console.log("Profile Photo:", profile.photos && profile.photos[0] ? profile.photos[0].value : 'N/A');

    // Store user data in the simple in-memory 'users' object
    // Ensure that profile.emails and profile.photos are not undefined before accessing their properties
    const userEmail = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
    const userPhoto = profile.photos && profile.photos[0] ? profile.photos[0].value : null;

    users[profile.id] = { id: profile.id, name: profile.displayName, email: userEmail, photo: userPhoto };
    
    console.log("User stored in in-memory DB:", users[profile.id]);
    return done(null, users[profile.id]);
  }
));

passport.serializeUser((user, done) => {
  console.log("--- Passport Serialize User ---");
  console.log("User ID to serialize:", user.id);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("--- Passport Deserialize User ---");
  console.log("User ID to deserialize:", id);
  const user = users[id];
  if (user) {
    console.log("Deserialized user:", user.name);
  } else {
    console.log("User not found during deserialization for ID:", id);
  }
  done(null, user);
});

// --- Routes ---
app.get('/auth/google',
  (req, res, next) => {
    console.log('--- Initiating Google OAuth Flow ---');
    next();
  },
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  (req, res, next) => {
    console.log('--- Inside /auth/google/callback route ---');
    next(); // Proceed to passport.authenticate
  },
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    console.log('--- Successfully authenticated via Passport (redirecting to /) ---');
    if (req.user) {
      console.log('User object exists on req.user:', req.user.name);
      // Ensure the redirect argument is explicitly a string
      res.redirect('/'); 
    } else {
      console.log('User object is NOT present on req.user after authentication. Redirecting to /');
      res.redirect('/'); // Always redirect to a string path
    }
  },
  (err, req, res, next) => { // Error handling middleware for this specific route
    console.error('--- General Error during /auth/google/callback processing ---');
    console.error(err);
    res.redirect('/?error=auth_failed'); // Redirect with a more specific error
  }
);

app.get('/logout', (req, res, next) => {
    console.log('--- User Logout initiated ---');
    req.logout(err => {
        if (err) {
            console.error('Error during logout:', err);
            return next(err);
        }
        console.log('User successfully logged out. Redirecting to /');
        res.redirect('/');
    });
});

app.use('/api', apiRouter); // Keep your API router intact

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});