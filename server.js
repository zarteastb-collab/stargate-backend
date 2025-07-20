import express from 'express';
import bodyParser from 'body-parser';
// Import the body-parser module to parse incoming request bodies
import cookieParser from 'cookie-parser';
// Import the cookie-parser module to parse cookies in requests
import session from 'express-session';
const app = cookieParser();

const app = session();

import router from './index.js';
// server.js - Main entry point for the Express application
// This file initializes the Express server and sets up the routes
// It imports the necessary modules and starts the server on a specified port
// Ensure you have the necessary environment variables set up
// such as PORT for the server to run correctly

const app = express();
// Create an instance of the Express application
// This app instance will be used to define routes and middleware
// The Express application is the core of your server-side logic
const PORT = process.env.PORT || 3000;
// Set the port for the server to listen on
// You can set this in your environment variables or use a default value
// The PORT variable is used to determine which port the server will run on
// If PORT is not set in the environment, it defaults to 3000

app.use(express.json());
// Middleware to parse JSON request bodies
// This allows the server to handle JSON data sent in requests
// It is essential for APIs that expect JSON input
// The express.json() middleware parses incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true }));
// Middleware to parse URL-encoded request bodies
// This is useful for handling form submissions and other URL-encoded data
// The express.urlencoded() middleware parses incoming requests with URL-encoded payloads
// The 'extended' option allows for rich objects and arrays to be encoded into the URL-
// encoded format, allowing for more complex data structures
// Use the router defined in index.js for handling routes
// This router will contain all the route definitions for your application
// It allows you to organize your routes in a modular way
// The router is imported from the index.js file, which contains the route definitions

app.use('/api', router);
// Use the router for all routes prefixed with '/api'
// This means that all routes defined in the router will be accessible under the '/api' path
// For example, if you have a route defined as '/users' in the router,
// it will be accessible at '/api/users'
// Start the server and listen on the specified port
// This will make the server start accepting incoming requests
app.get('/', (_req, res) => {
    // Define a simple route for the root path
    // This route will respond with a welcome message when accessed
    // You can modify this route to return any content you want
    // For example, you can return a JSON object or render a view
    res.send('Welcome to the Stargate Backend API!');
}
);

app.listen(PORT, () => {
    // Log a message to the console when the server starts
    // This helps in debugging and confirming that the server is running
    console.log(`Server is running on port ${PORT}`);
    // You can also add additional logging or monitoring here if needed
    // This message will be displayed in the console when the server starts successfully
});
