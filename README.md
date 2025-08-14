# MyContacts Backend API

A comprehensive Express.js backend API for managing contacts, products, orders, staff, and more.

## Features

- **Contacts Management**: CRUD operations for contacts
- **Products Management**: Product catalog with admin controls
- **Orders Management**: Order processing and tracking
- **Staff Management**: Staff registration and authentication
- **Ratings & Reviews**: Product rating system
- **Inventory Management**: Stock tracking and management
- **Sales Management**: Sales tracking and reporting
- **Reports**: Analytics and reporting features

## API Documentation

This project includes comprehensive Swagger/OpenAPI documentation that is automatically generated from the code.

### Accessing the Documentation

1. Start the server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000/api-docs
   ```

### Generating Documentation

To regenerate the Swagger documentation after making changes to routes:

```bash
npm run swagger
```

This will update the `Docs/swagger-output.json` file with the latest API documentation.

## API Endpoints

### Authentication
All endpoints require Bearer token authentication. Include the token in the Authorization header:
```
Authorization: Bearer your-token-here
```

### Available Endpoints

- **Contacts**: `/api/contacts`
- **Products**: `/api/products` (Admin only)
- **Orders**: `/api/orders`
- **Staff**: `/api/staffs`
- **Ratings**: `/api/ratings`
- **Stock**: `/api/stocks`
- **Sales**: `/api/sales`
- **Reports**: `/api/reports`

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables
4. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file with the following variables:
```
PORT=3000
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret
```

## Technologies Used

- **Express.js**: Web framework
- **Prisma**: Database ORM
- **JWT**: Authentication
- **Swagger**: API documentation
- **bcrypt**: Password hashing
- **express-rate-limit**: Rate limiting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add Swagger documentation for new endpoints
5. Submit a pull request

## License

ISC 