const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config(); // Load environment variables
const cors = require("cors");
const replicaRoutes = require("./routes/Replica");

const app = express();
app.use(cors());
// Middleware
app.use(bodyParser.json());

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI; // Fetch URI from .env
if (!mongoURI) {
  console.error("Error: MONGODB_URI is not defined in .env");
  process.exit(1);
}

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Exit process if connection fails
  });

// Routes
app.use("/api/replicas", replicaRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
