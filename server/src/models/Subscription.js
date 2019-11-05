const mongoose = require("mongoose");
const User = require("./User");
const Package = require("./Package");

const subscriptionSchema = mongoose.Schema({
  phone_number: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  end_user: {
    type: String,
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User
  },
  dnaPackage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Package
  }
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = Subscription;
