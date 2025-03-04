// config/pgConnection.js
const { Client } = require('pg');
const dotenv = require('dotenv').config();

let client;  // Declare the client at the top level so it can be reused

const pgConnection = () => {
    // If client already exists, return it
    if (client) return client;

    const password = decodeURIComponent(process.env.POST_PASS); // Decode password if needed
    client = new Client({
        user: process.env.POST_NAME,
        host: process.env.POST_HOST,
        database: process.env.POST_DATA,
        password: password,
        port: process.env.POST_PORT,
    });

    client.connect()
        .then(() => console.log("Connected to PostgreSQL"))
        .catch(err => {
            console.error('Connection error', err.stack);
            process.exit(1);  // Exit the application if the connection fails
        });

    return client;  // Return the client so it can be reused
};

module.exports = pgConnection;
