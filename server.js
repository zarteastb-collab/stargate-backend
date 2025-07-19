const express = require('express');
const bodyParser = require('body-parser');
const routes = require('index.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});