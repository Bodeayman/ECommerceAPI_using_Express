const express = require('express');
const router = express.Router();
const { buyAProduct } = require('../Controllers/saleController')
const validateTokenHandler = require('../Middleware/validateTokenHandler');


router.use(validateTokenHandler("staff"));
router.post('/buy/:id', buyAProduct);

module.exports = router;