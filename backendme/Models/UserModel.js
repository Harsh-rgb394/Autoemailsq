const mongoose = require("mongoose");

// Define the schema for a User
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Name is required
    },
    email: {
      type: String,
      required: true, // Email is required
    },
    password: {
      type: String,
      required: true, // Password is required
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create a model from the schema
const user = mongoose.model("user", UserSchema);

// Export the model
module.exports = user;
