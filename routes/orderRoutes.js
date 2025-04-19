const express = require('express');
const { getOrder, getAllOrders, createOrder } = require('../controllers/orderController');
const validateToken = require('../middleware/validateTokenHandler')

const router = express.Router();


router.get('/:id', getOrder);
router.get('/', getAllOrders);
router.post('/', createOrder)
//Give him the two function

module.exports = router;