const express = require('express');
const router = express.Router();
const { stripeWebhook } = require('../controllers/webhookController');

// Notice we do NOT put the Bouncer (authMiddleware) here, because Stripe is calling this, not the user.
router.post('/', stripeWebhook);

module.exports = router;