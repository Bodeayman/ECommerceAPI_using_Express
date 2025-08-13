const express = require('express');
const router = express.Router();
const { buyAProduct } = require('../Controllers/saleController')

router.post('/buy/:id', buyAProduct);

module.exports = router;