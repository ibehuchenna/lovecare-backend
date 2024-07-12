// models/Request.js

const mongoose = require('mongoose');

// Define schema for requests
const requestSchema = new mongoose.Schema({
  caretakerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CaretakerProfile', // Reference to the CaretakerProfile model
    required: true,
  },
  problem: {
    type: String,
    required: true,
  },
  scheduleTime: {
    type: String,
    required: true,
  },
  additionalRequirements: {
    type: String,
    required: true,
  },
  hours: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Create a model based on the schema
const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
