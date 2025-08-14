const express = require('express');
const router = express.Router();
const { changeStock } = require('../Controllers/stockController')
const { validateTokenHandler } = require('../Middleware/validateTokenHandler');

router.use(validateTokenHandler("staff"));

/**
 * @swagger
 * /stocks/change/{id}:
 *   put:
 *     summary: Change stock quantity
 *     description: Update the stock quantity for a specific product (Staff only)
 *     tags: 
 *       - Stock
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
 *             properties:
 *               quantity:
 *                 type: number
 *                 description: New stock quantity
 *                 example: 50
 *               operation:
 *                 type: string
 *                 description: Operation type (add, subtract, set)
 *                 enum: [add, subtract, set]
 *                 example: "add"
 *     responses:
 *       200:
 *         description: Stock updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Stock updated successfully"
 *                 newQuantity:
 *                   type: number
 *                   example: 150
 *       400:
 *         description: Bad request - Invalid quantity or operation
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Staff access required
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.put('/change/:id', changeStock)

module.exports = router;