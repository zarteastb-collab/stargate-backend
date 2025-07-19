import express from 'express';

const app = express();

app.get('/', (_req, res) => {
    res.json({ message: 'Welcome to the Render Web Service!' });
});

// Add more routes below as needed

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});