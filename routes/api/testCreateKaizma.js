const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth"); // Assuming auth middleware for authentication
const { check, validationResult } = require("express-validator");
const TestKaizma = require("../../models/TestKaizma");

// Route to create a new TestKaizma entry
router.post("/", async (req, res) => {
  try {
    // Create a new TestKaizma object
    const newPerson = new TestKaizma({
      name: req.body.name,
      age: req.body.age,
      job: req.body.job,
    });

    // Save the new entry in the database
    const savedPerson = await newPerson.save();

    // Send back the saved TestKaizma data
    res.json(savedPerson);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
