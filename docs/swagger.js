const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "My API",
        description: "API Documentation",
    },
    host: "localhost:5000",
    schemes: ["http"],
    tags: [
        { name: "Users", description: "Operations related to users" },
        { name: "Contacts", description: "Operations related to contacts" },
        { name: "Products", description: "Operations related to products" },
    ],
};

const outputFile = "./docs/swagger-output.json";
const endpointsFiles = ["./server.js", "./routes/userRoutes.js", "./routes/contactRoutes.js", "./routes/productRoutes.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
