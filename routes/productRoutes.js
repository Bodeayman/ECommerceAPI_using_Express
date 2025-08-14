const express = require('express');
const { getAllProducts, getProduct, createProduct, deleteProduct, updateProduct } = require('../Controllers/productController');
const { validateTokenHandler } = require('../Middleware/validateTokenHandler');

const router = express.Router();

router.use(validateTokenHandler("admin"));

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all products (Admin only)
 *     tags: 
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/Product'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Admin access required
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new product
 *     description: Create a new product with the provided information (Admin only)
 *     tags: 
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 description: Product name
 *                 example: "Sample Product"
 *               description:
 *                 type: string
 *                 description: Product description
 *                 example: "This is a sample product description"
 *               price:
 *                 type: number
 *                 description: Product price
 *                 example: 99.99
 *               category:
 *                 type: string
 *                 description: Product category
 *                 example: "Electronics"
 *               stock:
 *                 type: number
 *                 description: Available stock quantity
 *                 example: 100
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   $ref: '#/definitions/Product'
 *       400:
 *         description: Bad request - Missing required fields
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Admin access required
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllProducts);
router.post('/', createProduct);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     description: Retrieve a specific product by its ID (Admin only)
 *     tags: 
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   $ref: '#/definitions/Product'
 *       404:
 *         description: Product not found
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Admin access required
 *       500:
 *         description: Internal server error
 *   put:
 *     summary: Update a product
 *     description: Update an existing product's information (Admin only)
 *     tags: 
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *         example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Product name
 *                 example: "Updated Product Name"
 *               description:
 *                 type: string
 *                 description: Product description
 *                 example: "Updated product description"
 *               price:
 *                 type: number
 *                 description: Product price
 *                 example: 149.99
 *               category:
 *                 type: string
 *                 description: Product category
 *                 example: "Electronics"
 *               stock:
 *                 type: number
 *                 description: Available stock quantity
 *                 example: 75
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   $ref: '#/definitions/Product'
 *       404:
 *         description: Product not found
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Admin access required
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete a product
 *     description: Delete a product by its ID (Admin only)
 *     tags: 
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product deleted successfully"
 *       404:
 *         description: Product not found
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Admin access required
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getProduct);
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct);

module.exports = router;