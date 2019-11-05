const express = require("express");
const auth = require("../middleware/auth");
const Subscription = require("../models/Subscription");

const router = express.Router();

router.get("/subscriptions", auth, async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user._id })
      .populate("dnaPackage");
    res.send(subscriptions);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/subscriptions/:id", auth, async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ _id: req.params.id })
      .populate("dnaPackage")
      .populate("user");
    res.send(subscription);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).send({
        message: "Subscription not found with given id " + req.params.id
      });
    }
    return res.status(500).send({
      message: "Error retrieving subscription with given Id " + req.params.id
    });
  }
});

module.exports = router;
