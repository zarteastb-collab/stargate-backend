const express = require('express');
const bodyParser = require('body-parser');
const routes = require('/workspaces/stargate-backend/index.js'); // Adjust the path as necessary

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});