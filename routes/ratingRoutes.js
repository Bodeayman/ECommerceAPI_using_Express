const express = require('express');
const { getProductRating, giveProductRating } = require('../Controllers/ratingController');
const validateToken = require('../Middleware/validateTokenHandler')

const router = express.Router();

router.get('/:id', getProductRating);
router.post('/:id', giveProductRating);

module.exports = router;