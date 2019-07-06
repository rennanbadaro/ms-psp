require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const loadRoutes = require('./src/domains/routes');

const app = express();
const PORT = process.env.PORT || 3333;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

loadRoutes(app);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
