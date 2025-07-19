import dotenv from 'dotenv';

import { OpenAI } from 'openai';
// Load environment variables from .env file
// Ensure you have a .env file with OPENAI_API_KEY defined
// This is necessary for the OpenAI client to authenticate requests
// Make sure to install dotenv package if not already installed
// You can install it using npm: npm install dotenv

dotenv.config();
// Initialize OpenAI client with the API key from environment variables
// This allows you to securely manage your API keys without hardcoding them in your source code
// Ensure that the OPENAI_API_KEY is
// set in your environment variables or in a .env file
// The OpenAI client will use this key to authenticate requests to the OpenAI API
// Make sure to keep your API key secure and not expose it in public repositories
// The OpenAI client will be used to interact with the OpenAI API for various tasks
// such as generating text, images, etc.
// You can use this client to make requests to the OpenAI API endpoints
// as per your application's requirements

const openai = new OpenAI({

  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_API_BASE_URL || 'https://api.openai.com/v1',
  timeout: 10000, // Set a timeout for requests to avoid hanging indefinitely
  headers: {
    'User-Agent': 'Stargate Backend Client/1.0',
    'Content-Type': 'application/json',
  },

});
// Export the OpenAI client instance for use in other parts of the application
// This allows you to use the OpenAI client in your application
// without needing to reinitialize it multiple times
// You can import this client in your routes or services to interact with the OpenAI API
export default openai;
// The OpenAI client is now ready to be used in your application
// You can use it to make requests to the OpenAI API endpoints
// such as generating text, images, etc.
// Make sure to handle errors and responses appropriately in your application
// You can also configure additional options for the OpenAI client
// such as request retries, logging, etc. as per your application's requirements
// Ensure that you have the necessary permissions and rate limits set up
// for your OpenAI API key to avoid hitting rate limits or unauthorized access errors
// You can refer to the OpenAI API documentation for more details on how to use the client
// and the available endpoints and features