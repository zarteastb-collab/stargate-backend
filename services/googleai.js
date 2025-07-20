// services/googleai.js

import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

// Get the API key from the environment file and initialize the client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export default genAI;