const express = require("express");
// Importing the controller that handles email sequence creation
const MailController = require("../Controllers/EmailContoller");

const router = express.Router();

// Route for creating an email sequence
router.post("/create-sq", MailController);

// Export the router to be used in the main app
module.exports = router;
