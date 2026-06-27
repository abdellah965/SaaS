require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

connectDB();
const app = express();
app.use(cors());

// --- CRITICAL EXCEPTION: Webhook route MUST go before express.json() ---
// It uses express.raw() so the Stripe signature doesn't break
app.use('/api/webhook', express.raw({ type: 'application/json' }), require('./routes/webhookRoutes'));

// --- STANDARD MIDDLEWARE ---
app.use(express.json());

// --- STANDARD ROUTES ---
app.get('/api/status', (req, res) => {
  res.json({ message: "NovaStack Backend Engine is Live!" });
});
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/stripe', require('./routes/stripeRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running perfectly on http://localhost:${PORT}`);
});