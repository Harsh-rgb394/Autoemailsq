const mongoose = require("mongoose");

// Function to connect to MongoDB
const ConnectDB = async () => {
  try {
    // Attempt to connect using the connection string from environment variables
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connection successful");
  } catch (error) {
    // Log any connection errors
    console.log(error);
  }
};

module.exports = ConnectDB;
