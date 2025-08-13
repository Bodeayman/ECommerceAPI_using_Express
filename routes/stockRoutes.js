const express = require('express');
const router = express.Router();
const { changeStock } = require('../Controllers/stockController')

router.put('/change/:id', changeStock)

module.exports = router;