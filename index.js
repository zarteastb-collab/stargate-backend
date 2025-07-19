import express from 'express';
const app = express();
const router = express.Router();
router.get('/', (_req, res) => {
    res.json({ message: 'Welcome to the Render Web Service!' });
export default router;

app.get('/', (_req, res) => {
    res.json({ message: 'Welcome to the Render Web Service!' });
});

// Add more routes below as needed

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});