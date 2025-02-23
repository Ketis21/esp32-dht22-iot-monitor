// models/Data.js
const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  temperature: {
    type: Number,
    required: true
  },
  humidity: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now // Tallentaa automaattisesti ajankohdan
  }
});

module.exports = mongoose.model("Data", dataSchema);
