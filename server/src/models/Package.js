const mongoose = require("mongoose");

const packageSchema = mongoose.Schema({
  type: {
    type: String,
    trim: true
  },
  name: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: String,
    trim: true
  },
  agreement: {
    type: String,
    trim: true
  }
});

const Package = mongoose.model("Package", packageSchema);

module.exports = Package;
