const express = require('express');
const router = express.Router();
const { getLowStockProducts, getAllSales } = require('../Controllers/reportController')
const validateTokenHandler = require('../Middleware/validateTokenHandler');


router.use(validateTokenHandler("admin"));

router.get('/low', getLowStockProducts);
router.get('/sales', getAllSales);

module.exports = router;