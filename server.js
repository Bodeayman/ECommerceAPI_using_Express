const express = require('express');
const errorHandler = require('../mycontacts-backend/middleware/errorhandler');
const dotenv = require('dotenv').config();
const bodyParse = require('body-parser');
const connectDb = require('./config/dbConnection');

connectDb();
const app = express();
const PORT = process.env.PORT;

app.use(bodyParse.json());
app.use('/api/contacts', require("./routes/contactRoutes"));
app.use(errorHandler);

app.listen(PORT, () => console.log(`Kill yourself because the server works in ${PORT}`));