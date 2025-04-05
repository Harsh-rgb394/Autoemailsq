const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const ConnectDB = require("./Connect/db");
const Seqroute = require("./Routes/EmailRoute");
const { agenda } = require("./utils/seqhandler");
const useroute=require("./Routes/UserRoute");

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Connect to Database
ConnectDB();

// ✅ Configure CORS properly
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Default Route
app.get("/", (req, res) => {
    res.send("First Server");
});

// API Routes
app.use("/user",useroute);
app.use("/api/sequence", Seqroute);


// for listing or wokring agenda we have to define here 
agenda.on("ready", () => {
    agenda.start().then(() => {
      console.log("Agenda job processor started...");
    });
  });

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
