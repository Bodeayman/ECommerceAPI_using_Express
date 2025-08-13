const express = require('express');
const { registerUser, currentUser, loginUser, updateProfile } = require('../Controllers/userController');
const validateToken = require('../Middleware/validateTokenHandler');

const router = express.Router();


router.post('/register', registerUser);

router.post('/login', loginUser);
router.get('/current', validateToken, currentUser);
router.put('/update', validateToken, updateProfile);
//Give him the two function

module.exports = router;