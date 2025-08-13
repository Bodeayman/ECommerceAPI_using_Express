const express = require('express');
const { getAllUserOrders, getAllOrders, createOrder } = require('../Controllers/orderController');
const validateToken = require('../Middleware/validateTokenHandler')

const router = express.Router();


router.get('/:id', getAllUserOrders);
router.get('/', getAllOrders);
router.post('/:id', createOrder)
//Give him the two function

module.exports = router;