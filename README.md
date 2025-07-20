# Stargate Backend

A simple web service built with Node.js and Express, designed to interface with the OpenAI API. This project is configured for local development and easy deployment on services like Render.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm (usually comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone <your-repository-url>
    cd stargate-backend
    ```

2.  **Install the dependencies:**
    ```sh
    npm install
    ```

3.  **Create an environment file:**
    Create a file named `.env` in the root of the project and add your OpenAI API key.
    ```
    OPENAI_API_KEY="your_secret_api_key_here"
    ```

### Running the Service

-   **For development (with auto-reloading):**
    ```sh
    npm run dev
    ```

-   **For production:**
    ```sh
    npm start
    ```

The server will run on [http://localhost:3000](http://localhost:3000) (or the port specified in your `.env` file).

---

### API Endpoints

-   `GET /`
    -   Returns a simple welcome message for the service.
-   `GET /api/`
    -   Returns a welcome message for the API.
-   `POST /api/chat`
    -   Accepts a JSON body with a `message` key and returns a response from OpenAI.
    -   **Body:** `{ "message": "Hello, world!" }`

### Deployment on Render

This project is ready for deployment on Render.
1.  Push your code to a GitHub repository.
2.  On Render, create a new "Web Service" and connect it to your repository.
3.  Set the **Start Command** to `npm start`.
4.  Add your `OPENAI_API_KEY` as an **Environment Variable** in the Render dashboard.

---
### License

This project is licensed under the MIT License.