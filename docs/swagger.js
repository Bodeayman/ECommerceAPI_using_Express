const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "MyContacts Backend API",
        description: "A comprehensive API for managing contacts, products, orders, staff, and more",
        version: "1.0.0",
        contact: {
            name: "API Support",
            email: "support@mycontacts.com"
        }
    },
    host: "localhost:5000",
    basePath: "/api",
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    securityDefinitions: {
        bearerAuth: {
            type: "apiKey",
            name: "Authorization",
            in: "header",
            description: "Enter the token with the `Bearer ` prefix, e.g. `Bearer abcde12345`"
        }
    },
    tags: [
        { name: "Contacts", description: "Operations related to contacts management" },
        { name: "Products", description: "Operations related to products management" },
        { name: "Orders", description: "Operations related to orders management" },
        { name: "Staff", description: "Operations related to staff management" },
        { name: "Ratings", description: "Operations related to ratings and reviews" },
        { name: "Stock", description: "Operations related to inventory management" },
        { name: "Sales", description: "Operations related to sales management" },
        { name: "Reports", description: "Operations related to reports and analytics" }
    ],
    definitions: {
        Contact: {
            name: "John Doe",
            email: "john@example.com",
            phone: "+1234567890"
        },
        Product: {
            name: "Sample Product",
            description: "Product description",
            price: 99.99,
            category: "Electronics"
        },
        Order: {
            customerId: "customer123",
            products: ["product1", "product2"],
            totalAmount: 199.98,
            status: "pending"
        },
        Staff: {
            name: "Jane Smith",
            email: "jane@company.com",
            role: "manager",
            department: "Sales"
        },
        Rating: {
            productId: "product123",
            userId: "user123",
            rating: 5,
            comment: "Great product!"
        }
    }
};

const outputFile = "./Docs/swagger-output.json";
const endpointsFiles = [
    "./server.js",
    "./Routes/contactRoutes.js",
    "./Routes/productRoutes.js",
    "./Routes/orderRoutes.js",
    "./Routes/staffRoutes.js",
    "./Routes/ratingRoutes.js",
    "./Routes/stockRoutes.js",
    "./Routes/saleRoutes.js",
    "./Routes/reportRoutes.js"
];

// Custom swagger-autogen configuration
const options = {
    autoHeaders: true,
    autoQuery: true,
    autoBody: true
};

swaggerAutogen(outputFile, endpointsFiles, doc, options);
