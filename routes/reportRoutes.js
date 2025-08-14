const express = require('express');
const router = express.Router();
const { getLowStockProducts, getAllSales, exportProductsInFile, exportSalesInFile } = require('../Controllers/reportController')
const { validateTokenHandler } = require('../Middleware/validateTokenHandler');

router.use(validateTokenHandler("admin"));

/**
 * @swagger
 * /reports/low:
 *   get:
 *     summary: Get low stock products
 *     description: Retrieve products with low stock levels (Admin only)
 *     tags: 
 *       - Reports
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: threshold
 *         schema:
 *           type: number
 *         description: Stock threshold (default: 10)
 *         example: 10
 *     responses:
 *       200:
 *         description: Low stock products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/Product'
 *                 count:
 *                   type: number
 *                   example: 5
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Admin access required
 *       500:
 *         description: Internal server error
 */
router.get('/low', getLowStockProducts);

/**
 * @swagger
 * /reports/sales:
 *   get:
 *     summary: Get all sales
 *     description: Retrieve all sales data (Admin only)
 *     tags: 
 *       - Reports
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for sales report (YYYY-MM-DD)
 *         example: "2024-01-01"
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for sales report (YYYY-MM-DD)
 *         example: "2024-12-31"
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: Page number for pagination
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: Number of items per page
 *         example: 20
 *     responses:
 *       200:
 *         description: Sales data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sales:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       productId:
 *                         type: string
 *                       quantity:
 *                         type: number
 *                       totalAmount:
 *                         type: number
 *                       customerId:
 *                         type: string
 *                       date:
 *                         type: string
 *                         format: date-time
 *                 totalSales:
 *                   type: number
 *                 totalRevenue:
 *                   type: number
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: number
 *                     limit:
 *                       type: number
 *                     total:
 *                       type: number
 *                     pages:
 *                       type: number
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Admin access required
 *       500:
 *         description: Internal server error
 */
router.get('/sales', getAllSales);

/**
 * @swagger
 * /reports/exportSales:
 *   get:
 *     summary: Export sales data
 *     description: Export sales data to file (Admin only)
 *     tags: 
 *       - Reports
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: format
 *         schema:
 *           type: string
 *           enum: [csv, pdf, excel]
 *         description: Export format
 *         example: "csv"
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for export (YYYY-MM-DD)
 *         example: "2024-01-01"
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for export (YYYY-MM-DD)
 *         example: "2024-12-31"
 *     responses:
 *       200:
 *         description: Sales data exported successfully
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Admin access required
 *       500:
 *         description: Internal server error
 */
router.get('/exportSales', exportSalesInFile);

/**
 * @swagger
 * /reports/exportProducts:
 *   get:
 *     summary: Export products data
 *     description: Export products data to file (Admin only)
 *     tags: 
 *       - Reports
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: format
 *         schema:
 *           type: string
 *           enum: [csv, pdf, excel]
 *         description: Export format
 *         example: "csv"
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *         example: "Electronics"
 *     responses:
 *       200:
 *         description: Products data exported successfully
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Admin access required
 *       500:
 *         description: Internal server error
 */
router.get('/exportProducts', exportProductsInFile);

module.exports = router;