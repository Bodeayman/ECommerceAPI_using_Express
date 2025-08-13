const express = require('express');
const router = express.Router();
const { getLowStockProducts, getAllSales, exportProductsInFile, exportSalesInFile } = require('../Controllers/reportController')
const validateTokenHandler = require('../Middleware/validateTokenHandler');


router.use(validateTokenHandler("admin"));

router.get('/low', getLowStockProducts);
router.get('/sales', getAllSales);
router.get('/exportSales', exportSalesInFile);
router.get('/exportProducts', exportProductsInFile);


module.exports = router;