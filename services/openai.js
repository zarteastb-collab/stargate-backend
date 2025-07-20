// services/openai.js

import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  // You can add other configurations like baseURL, timeout, etc. if needed
});

export default openai;
