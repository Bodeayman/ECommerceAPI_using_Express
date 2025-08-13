const express = require('express');
const router = express.Router();
const { changeStock } = require('../Controllers/stockController')
const validateTokenHandler = require('../Middleware/validateTokenHandler');


router.use(validateTokenHandler("staff"));
router.put('/change/:id', changeStock)

module.exports = router;