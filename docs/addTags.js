const fs = require('fs');
const path = require('path');

// Read the generated swagger file
const swaggerPath = path.join(__dirname, 'swagger-output.json');
const swaggerContent = JSON.parse(fs.readFileSync(swaggerPath, 'utf8'));

// Define tags for each endpoint
const endpointTags = {
    '/api/contacts/': 'Contacts',
    '/api/contacts/{id}': 'Contacts',
    '/api/products/': 'Products',
    '/api/products/{id}': 'Products',
    '/api/orders/': 'Orders',
    '/api/orders/{id}': 'Orders',
    '/api/staffs/': 'Staff',
    '/api/staffs/{id}': 'Staff',
    '/api/staffs/register': 'Staff',
    '/api/staffs/login': 'Staff',
    '/api/staffs/search': 'Staff',
    '/api/ratings/': 'Ratings',
    '/api/ratings/{id}': 'Ratings',
    '/api/stocks/change/{id}': 'Stock',
    '/api/sales/buy/{id}': 'Sales',
    '/api/reports/low': 'Reports',
    '/api/reports/sales': 'Reports',
    '/api/reports/exportSales': 'Reports',
    '/api/reports/exportProducts': 'Reports'
};

// Add tags to each endpoint
Object.keys(swaggerContent.paths).forEach(path => {
    const pathObj = swaggerContent.paths[path];
    Object.keys(pathObj).forEach(method => {
        const methodObj = pathObj[method];
        if (endpointTags[path]) {
            methodObj.tags = [endpointTags[path]];
        }
    });
});

// Write the updated swagger file
fs.writeFileSync(swaggerPath, JSON.stringify(swaggerContent, null, 2));

console.log('Tags added successfully to swagger-output.json'); 