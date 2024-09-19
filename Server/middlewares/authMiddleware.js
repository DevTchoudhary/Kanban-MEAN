const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;

  // Check if there is an Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Extract token from the header
    token = req.headers.authorization.split(" ")[1];
  }

  // If no token is provided
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Fetch the user based on the decoded token ID
    req.user = await User.findById(decoded.id).select("-password");

    // If the user is not found
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized, user not found" });
    }

    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized, token failed" });
  }
};

module.exports = protect;
