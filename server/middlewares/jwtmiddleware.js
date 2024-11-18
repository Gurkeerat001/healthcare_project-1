const jwt = require("jsonwebtoken");

// JWT token generation
const generateJwtToken = (userData) => {
    // Only include user id for token payload to keep it small and secure
    return jwt.sign({ id: userData.id }, process.env.JWT_SECRET, { expiresIn: '1h' }); 
}

// JWT token validation middleware
const validateJwtToken = (req, res, next) => {
    // Extract token from the Authorization header (Bearer token)
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json({ err: "Token not available" });
    }

    try {
        // Verify the token and decode it
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next(); 
    } catch (err) {
        return res.status(401).json({ err: "Invalid token" });
    }
};

module.exports = { generateJwtToken, validateJwtToken };