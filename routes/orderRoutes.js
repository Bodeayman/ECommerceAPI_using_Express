const express = require('express');
const { getOrder, getAllOrders } = require('../controllers/orderController');
const validateToken = require('../middleware/validateTokenHandler')

const router = express.Router();


// router.get('/:id', getProduct);
router.get('/', getAllOrders);
// router.post('/', createProduct)
// router.delete('/:id', deleteProduct);
// router.put('/:id', updateProduct);
//Give him the two function

module.exports = router;