const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    // 1. Grab the email and password the user typed into the frontend
    const { email, password } = req.body;

    // 2. Check if a user with this email already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // 3. Encrypt the password (Hash it 10 times for maximum security)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create the new user with the scrambled password
    const newUser = new User({
      email,
      password: hashedPassword
    });

    // 5. Save the user strictly to the 'users' collection in MongoDB
    await newUser.save();

    res.status(201).json({ message: "Account created successfully!" });

  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// --- LOGIN LOGIC ---
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if the user actually exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // 2. Compare the typed password with the scrambled password in the vault
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // 3. Print the VIP Badge (JWT)
    // We lock their user ID inside the badge and set it to expire in 1 day
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // 4. Send the badge back to the frontend
    res.json({ token, message: "Logged in successfully!" });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// --- GET USER PROFILE (PROTECTED) ---
exports.getUserProfile = async (req, res) => {
  try {
    // Because the bouncer (middleware) let them through, we know req.user.id is safe and verified
    // We use .select('-password') to ensure we NEVER accidentally send the hashed password to the frontend
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json(user);
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    res.status(500).json({ message: "Server Error." });
  }
};