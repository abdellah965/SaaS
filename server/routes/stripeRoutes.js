const express = require('express');
const router = express.Router();
const { createCheckoutSession } = require('../controllers/stripeController');
const authMiddleware = require('../middleware/authMiddleware');

// PROTECTED: Only logged-in users can access the checkout
router.post('/create-checkout-session', authMiddleware, createCheckoutSession);

module.exports = router;