const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware'); // Import the bouncer

router.post('/register', registerUser);
router.post('/login', loginUser);

// This is a PROTECTED route. It runs authMiddleware first.
router.get('/me', authMiddleware, getUserProfile); 

module.exports = router;