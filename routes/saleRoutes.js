const express = require('express');
const router = express.Router();
const { buyAProduct } = require('../Controllers/saleController')
const { validateTokenHandler } = require('../Middleware/validateTokenHandler');

router.use(validateTokenHandler("staff"));

/**
 * @swagger
 * /sales/buy/{id}:
 *   post:
 *     summary: Buy a product
 *     description: Process a product purchase (Staff only)
 *     tags: 
 *       - Sales
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
 *             required:
 *               - quantity
 *               - customerId
 *             properties:
 *               quantity:
 *                 type: number
 *                 description: Quantity to purchase
 *                 example: 2
 *               customerId:
 *                 type: string
 *                 description: Customer ID
 *                 example: "customer123"
 *               customerName:
 *                 type: string
 *                 description: Customer name
 *                 example: "John Doe"
 *               customerEmail:
 *                 type: string
 *                 format: email
 *                 description: Customer email
 *                 example: "john@example.com"
 *               paymentMethod:
 *                 type: string
 *                 description: Payment method
 *                 enum: [cash, card, transfer]
 *                 example: "card"
 *     responses:
 *       201:
 *         description: Purchase completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Purchase completed successfully"
 *                 saleId:
 *                   type: string
 *                   example: "sale123"
 *                 totalAmount:
 *                   type: number
 *                   example: 199.98
 *                 remainingStock:
 *                   type: number
 *                   example: 48
 *       400:
 *         description: Bad request - Invalid quantity or insufficient stock
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Staff access required
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.post('/buy/:id', buyAProduct);

module.exports = router;