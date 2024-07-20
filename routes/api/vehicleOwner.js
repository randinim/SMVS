const express = require("express");
const { ExpressValidator } = require("express-validator");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const VehicleOwner = require("../../models/VehicleOwner");

// @route   POST api/vehicleOwner
// @desc    Register Vehicle Owner
// @access  Public

router.post(
  "/",
  [
    check("name", "Name is required!").not().isEmpty(),
    check("email", "Please include valid email!").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters!"
    ).isLength({ min: 6 }),
    check("phone", "Please enter a valid mobile number!").isLength({
      min: 10,
      max: 10,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, phone } = req.body;

    try {
      let vehicleOwner = await VehicleOwner.findOne({ email });

      if (vehicleOwner) {
        res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      vehicleOwner = new VehicleOwner({
        name,
        email,
        avatar,
        password,
        phone,
      });

      const salt = await bcrypt.genSalt(10);

      vehicleOwner.password = await bcrypt.hash(password, salt);

      await vehicleOwner.save();

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
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
