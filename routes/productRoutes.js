const express = require('express');
const { getAllProducts, getProduct, createProduct, deleteProduct, updateProduct } = require('../controllers/productController');
const validateTokenHandler = require('../Middleware/validateTokenHandler');

const router = express.Router();


router.use(validateTokenHandler("admin"));

router.get('/', getAllProducts);

router.get('/:id', getProduct);


router.post('/', createProduct)
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct);
//Give him the two function

module.exports = router;