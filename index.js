import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
    res.json({ message: 'Welcome to the Render Web Service!' });
});

// Define other routes here

export default router;