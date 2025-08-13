const express = require('express');
const dotenv = require('dotenv').config();
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./Docs/swagger-output.json"); // Auto-generated
const errorHandler = require('./Middleware/errorhandler');
const validateTokenHandler = require('./Middleware/validateTokenHandler');

const pgConnection = require('./config/pgConnection');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// app.use(validateTokenHandler);


app.use('/api/users', require("./Routes/userRoutes"));
app.use('/api/contacts', require("./Routes/contactRoutes"));

app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./Routes/orderRoutes'));
app.use('/api/rating', require('./Routes/ratingRoutes'));


// app.use(errorHandler);


app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
