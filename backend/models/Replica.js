const mongoose = require("mongoose");

// const replicaSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     description: { type: String },
//     persona: { type: String, required: true }, // e.g., "friendly", "teacher"
//     tone: { type: String, default: "neutral" },
//     createdAt: { type: Date, default: Date.now },
// });

const replicaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  persona: { type: String, required: true },
  tone: { type: String, default: "neutral" },
  image: { type: String }, // Field to store the uploaded image URL
  createdAt: { type: Date, default: Date.now }, // Automatically store the creation timestamp
});

module.exports = mongoose.model("Replica", replicaSchema);
