const express = require("express");
// Importing controller functions for user registration and login
const { RegisterController, LoginController } = require("../Controllers/UserController");

const router = express.Router();

// Route for user registration
router.post("/register", RegisterController);

// Route for user login
router.post("/login", LoginController);

// Export the router to be used in the main app
module.exports = router;
