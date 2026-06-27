const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // 1. Look for the token in the request headers
  const authHeader = req.header('Authorization');

  // 2. If there is no token, deny access instantly
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Access denied. No VIP badge provided." });
  }

  try {
    // 3. Extract the token (removing the word "Bearer ")
    const token = authHeader.split(' ')[1];

    // 4. Verify the token using our secret vault key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Attach the decrypted user ID to the request so the next function can use it
    req.user = decoded;
    
    // 6. Let them pass
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired VIP badge." });
  }
};