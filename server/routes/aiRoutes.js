const express = require('express');
const router = express.Router();
const { generateText } = require('../controllers/aiController');
const authMiddleware = require('../middleware/authMiddleware');

// This route is PROTECTED. Only users with a VIP badge can use the AI.
router.post('/generate', authMiddleware, generateText);

module.exports = router;