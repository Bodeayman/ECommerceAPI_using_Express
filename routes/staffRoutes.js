const express = require('express');
const { registerStaff, currentStaff, loginStaff, updateProfile, searchForAProduct } = require('../Controllers/staffController');
const validateTokenHandler = require('../Middleware/validateTokenHandler');

const router = express.Router();


router.use(validateTokenHandler);


router.post('/register', registerStaff);
router.get('/search', searchForAProduct)
router.post('/login', loginStaff);
router.get('/current', validateTokenHandler, currentStaff);
router.put('/update', validateTokenHandler, updateProfile);
//Give him the two function

module.exports = router;