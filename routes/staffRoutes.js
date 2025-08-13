const express = require('express');
const { registerStaff, currentStaff, loginStaff, updateProfile } = require('../Controllers/staffController');
const validateToken = require('../Middleware/validateTokenHandler');

const router = express.Router();


router.post('/register', registerStaff);

router.post('/login', loginStaff);
router.get('/current', validateToken, currentStaff);
router.put('/update', validateToken, updateProfile);
//Give him the two function

module.exports = router;