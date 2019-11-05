const express = require("express");
const Package = require("../models/Package");

const router = express.Router();

router.get("/packages", async (req, res) => {
  try {
    const packages = await Package.find();
    res.send(packages);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;