const express = require('express');
const dotenv = require('dotenv').config();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger-output.json"); // Auto-generated
const errorHandler = require('./middleware/errorhandler');
const pgConnection = require('./config/pgConnection');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/contacts', require("./routes/contactRoutes"));
app.use('/api/users', require("./routes/userRoutes"));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/rating', require('./routes/ratingRoutes'));


app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
