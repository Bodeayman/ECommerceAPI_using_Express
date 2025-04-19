const express = require('express');
const { getProductRating, giveProductRating } = require('../controllers/ratingController');
const validateToken = require('../middleware/validateTokenHandler')

const router = express.Router();

router.get('/:id', getProductRating);
router.post('/:id', giveProductRating);

module.exports = router;