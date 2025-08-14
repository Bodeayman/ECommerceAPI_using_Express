const express = require('express');
const { registerStaff, currentStaff, loginStaff, updateProfile, searchForAProduct, refreshToken } = require('../Controllers/staffController');
const { validateTokenHandler, RefreshTokenHandler } = require('../Middleware/validateTokenHandler');

const router = express.Router();





router.post('/register', registerStaff);
router.get('/search', validateTokenHandler(), searchForAProduct)
router.post('/login', loginStaff);
router.get('/current', validateTokenHandler(), currentStaff);
router.put('/update', validateTokenHandler(), updateProfile);
router.post('/refresh', RefreshTokenHandler(), refreshToken);
//Give him the two function

module.exports = router;