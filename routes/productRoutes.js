const express = require('express');
const { getAllProducts, getProduct, createProduct, deleteProduct } = require('../controllers/productController');
const validateToken = require('../middleware/validateTokenHandler')

const router = express.Router();


router.get('/:id', getProduct);
router.get('/', getAllProducts);
router.post('/', createProduct)
router.delete('/:id', deleteProduct);
//Give him the two function

module.exports = router;