const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

// Models
const VehicleOwner = require("../../models/VehicleOwner");
const Inquiry = require("../../models/Inquiry");

function formatPhoneNumber(phoneNumber) {
  if (phoneNumber.startsWith("0")) {
    phoneNumber = "94" + phoneNumber.substring(1);
  }
  return phoneNumber;
}

// @route POST api/inquiries
// @desc Create an inquiry
// @access Private
router.post("/", [
  [
    check("phone", "Phone is required!").not().isEmpty(),
    check("title", "Title is required!").not().isEmpty(),
    check("description", "Description is required!").not().isEmpty(),
    check("inquiryType", "Inquiry Type is required!").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Getting the user who creates the inquiry
      // const customer = await VehicleOwner.findById(req.user.id).select(
      //   "-password"
      // );

      // Creating an new inquiry
      const newInquiry = new Inquiry({
        email: req.body.email,
        phone: req.body.phone,
        title: req.body.title,
        description: req.body.description,
        inquiryType: req.body.inquiryType,
        status: "pending",
      });

      // Save the inquiry in DB and set that inquiry in variable
      const inquiry = await newInquiry.save();

      // Get the saved inquiry as response
      res.json(inquiry);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error!");
    }
  },
]);

// @route   GET api/inquiries
// @desc    Get all inquiries
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ date: -1 });
    res.json(inquiries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

// @route   GET api/inquiries/:id
// @desc    Get inquiry by ID
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(400).json({ msg: "Inquiry Not Found!" });
    }

    res.json(inquiry);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Inquiry Not Found!" });
    }
    res.status(500).send("Server Error!");
  }
});

// @route PUT api/inquiries/:id
// @desc Update an inquiry
// @access Private
router.put("/:id", [
  auth,
  [
    check("phone", "Phone is required!").not().isEmpty(),
    check("title", "Title is required!").not().isEmpty(),
    check("description", "Description is required!").not().isEmpty(),
    check("inquiryType", "Inquiry Type is required!").not().isEmpty(),
    check("status", "Status is required!").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id;

    try {
      const inquiry = await Inquiry.findByIdAndUpdate(id, req.body);

      if (!inquiry) {
        return res.status(400).json({ msg: "Inquiry Not Found!" });
      }

      // Format the phone number before sending a message
      const formattedPhone = formatPhoneNumber(inquiry.phone);

      const updatedInquiry = await Inquiry.findById(id);

      // Generate a dynamic message based on the inquiry status
      const statusMessage = `Your inquiry status set to: ${updatedInquiry.status}.`;
      const message = `Hello, we're from Negombo Motor Shop, \n\nYour inquiry has been updated successfully. ${statusMessage}`;

      // Send a confirmation message to the client's phone
      // await sendMessage(formattedPhone, message);
      // console.log(message);

      // Get the updated inquiry as response
      res.json(updatedInquiry);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error!");
    }
  },
]);

// @route   DELETE api/inquiries/:id
// @desc    Delete an inquiry
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);

    // If inquiry not found
    if (!inquiry) {
      return res.status(400).json({ msg: "Inquiry Not Found!" });
    }

    await inquiry.deleteOne();

    res.json({ msg: "Inquiry Removed!" });
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Inquiry Not Found!" });
    }
    res.status(500).send("Server Error!");
  }
});

// Function to send a message using the notify.lk API
async function sendMessage(to, message) {
  const apiUrl = "https://app.notify.lk/api/v1/send";
  const userId = "27075"; // Replace with your user ID
  const apiKey = "iavgguXxPi6LGJ4C5dVg"; // Replace with your API key
  const senderId = "NotifyDEMO"; // Replace with your sender ID

  const data = {
    user_id: userId,
    api_key: apiKey,
    sender_id: senderId,
    to: to,
    message: message,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json(); // Assuming the API responds with JSON
    console.log("Success:", responseData);
  } catch (error) {
    console.error("Error:", error);
  }
}

module.exports = router;
