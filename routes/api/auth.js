const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const VehicleOwner = require("../../models/VehicleOwner");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");
const { check, validationResult } = require("express-validator");

// @route    GET api/auth
// @desc     Get user by token
// @access   Private

router.get("/", auth, async (req, res) => {
  try {
    const vehicleOwner = await VehicleOwner.findById(req.user.id).select(
      "-password"
    );
    res.json(vehicleOwner);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public

router.post(
  "/",
  [
    check("email", "Please include valid email!").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let vehicleOwner = await VehicleOwner.findOne({ email });

      if (!vehicleOwner) {
        res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, vehicleOwner.password);

      if (!isMatch) {
        res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          id: vehicleOwner.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token, userId: vehicleOwner.id });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);
// @route   PUT api/auth/password
// @desc    Update vehicle owner's password
// @access  Private
router.put("/password", auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const vehicleOwner = await VehicleOwner.findById(req.user.id);

    const isMatch = await bcrypt.compare(
      currentPassword,
      vehicleOwner.password
    );

    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Current password is incorrect" }] });
    }

    const salt = await bcrypt.genSalt(10);
    vehicleOwner.password = await bcrypt.hash(newPassword, salt);

    await vehicleOwner.save();

    res.json({ msg: "Password updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/auth/update
// @desc    Update vehicle owner information (name, email, phone)
// @access  Private
router.put("/update", auth, async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const vehicleOwner = await VehicleOwner.findById(req.user.id);

    if (name) vehicleOwner.name = name;
    if (email) vehicleOwner.email = email;
    if (phone) vehicleOwner.phone = phone;

    await vehicleOwner.save();

    res.json(vehicleOwner);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
