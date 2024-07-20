const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const VehicleOwner = require("../../models/VehicleOwner");
const { check, validationResult } = require("express-validator");

// @route   Get api/profile/me
// @desc    Get Current users profile
// @access  Private

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   Get api/profile
// @desc    Create or update user profile
// @access  Privatee

router.post(
  "/",
  [
    auth,
    [
      check("nic", "NIC is required").not().isEmpty(),
      check("address", "Address is required").not().isEmpty(),
      check("licensenumber", "License Number is required").not().isEmpty(),
      check("expirydate", "Expiry Date is required").not().isEmpty(),
      check("issueddate", "Issued Date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nic, address, licensenumber, expirydate, issueddate } = req.body;

    // build a profile
    const profileFields = {
      user: req.user.id,
      nic: nic,
      address: address,
      licensenumber: licensenumber,
      expirydate: expirydate,
      issueddate: issueddate,
    };

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      await profile.save();

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route   Get api/profile
// @desc    Get all profiles
// @access  public

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   Get api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  public

router.get("/user/:user_id", async (req, res) => {
  try {
    const profiles = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profiles) return res.status(400).json({ msg: "Profile not found" });

    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/profile
// @desc    Delete profile, user
// @access  Private

router.delete("/", auth, async (req, res) => {
  try {
    //Remove Profile
    await Profile.findOneAndDelete({ user: req.user.id });
    //Remove User
    await VehicleOwner.findOneAndDelete({ _id: req.user.id });

    res.json({ msg: "User Deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/profile/vehicle
// @desc    Add Vehicle
// @access  Private

router.put(
  "/vehicle",
  auth,
  [
    check("make", "Make is required").not().isEmpty(),
    check("model", "Model is required").not().isEmpty(),
    check("year", "Year is required").not().isEmpty(),
    check("registrationnumber", "Registration Number is required")
      .not()
      .isEmpty(),
    check("fueltype", "Fuel Type is required").not().isEmpty(),
    check("dailyusage", "Daily Usage is required").not().isEmpty(),
    check("licensenumber", "License Number is required").not().isEmpty(),
    check("licenseissued", "License Issued Date is required").not().isEmpty(),
    check("licenseexpiry", "License Expiry Date is required").not().isEmpty(),
    check("insurancenumber", "Insurance Number is required").not().isEmpty(),
    check("insurancetype", "Insurance Type is required").not().isEmpty(),
    check("expirydate", "Expiry Date is required").not().isEmpty(),
    check("issueddate", "Issued Date is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      make,
      model,
      year,
      registrationnumber,
      fueltype,
      dailyusage,
      licensenumber,
      licenseissued,
      licenseexpiry,
      insurancenumber,
      insurancetype,
      expirydate,
      issueddate,
    } = req.body;

    const newVehicle = {
      make,
      model,
      year,
      registrationnumber,
      fueltype,
      dailyusage,
      licensenumber,
      licenseissued,
      licenseexpiry,
      insurancenumber,
      insurancetype,
      expirydate,
      issueddate,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.vehicle.unshift(newVehicle);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET api/profile/vehicles
// @desc    Get vehicles by user token
// @access  Private

router.get("/vehicles", auth, async (req, res) => {
  try {
    // Find the profile associated with the user token
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }

    // Extract the vehicles from the profile
    const vehicles = profile.vehicle;

    res.json(vehicles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/profile/vehicle/:v_id
// @desc    Delete Vehicle from profile
// @access  Private

router.delete("/vehicle/:v_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index
    const removeIndex = profile.vehicle
      .map((item) => item.id)
      .indexOf(req.params.v_id);

    profile.vehicle.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
