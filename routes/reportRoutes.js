const express = require('express');
const router = express.Router();
const { getLowStockProducts, getAllSales } = require('../Controllers/reportController')

router.get('/low', getLowStockProducts);
router.get('/sales', getAllSales);

module.exports = router;