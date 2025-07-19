import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to the Render Web Service!');
});

// Define other routes here

export default (app) => {
    app.use('/api', router);
};