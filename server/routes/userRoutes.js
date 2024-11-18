const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require("../controllers/userController");
const { validateJwtToken } = require("../middlewares/jwtmiddleware"); 

// Route to register a new user
router.post("/create", registerUser);

// Route to login a user
router.post("/login", loginUser);

// Example of a protected route (requires JWT token)
router.get("/profile", validateJwtToken, (req, res) => {
    res.json({ message: "This is a protected route.", user: req.user });
});

// Route for getting the user specific data
router.get("/myAccount",validateJwtToken,getUserProfile)

// Route for updating the user specific data
router.patch("/myAccount",validateJwtToken,updateUserProfile)

module.exports = router;