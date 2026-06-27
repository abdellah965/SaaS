const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');

exports.stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // SECURITY: We verify that this request actually came from Stripe, not a hacker
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // If the payment was successful
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.client_reference_id; // Read the nametag we attached earlier

    try {
      // Find the user and instantly upgrade them to Pro
      const user = await User.findById(userId);
      if (user) {
        user.isPro = true;
        await user.save();
        console.log(`SUCCESS: Upgraded user ${user.email} to PRO.`);
      }
    } catch (error) {
      console.error("Database Error during upgrade:", error);
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  res.status(200).json({ received: true });
};