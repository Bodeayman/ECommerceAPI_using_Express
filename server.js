const express = require('express');
const errorHandler = require('./middleware/errorhandler');
const dotenv = require('dotenv').config();
const bodyParse = require('body-parser');
const connectDb = require('./config/dbConnection');
const pgConnection = require('./config/pgConnection');

// connectDb();
const app = express();
const PORT = process.env.PORT;

app.use(bodyParse.json());
app.use('/api/contacts', require("./routes/contactRoutes"));
app.use('/api/users', require("./routes/userRoutes"));
app.use('/api/products', require('./routes/productRoutes'));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Kill yourself because the server works in ${PORT}`));