const express = require("express");
const router = express.Router();
const checkObjectId = require("../../middleware/checkObjectId");
const Reservation = require("../../models/Reservation"); // Capitalized Reservation to match the export

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post("/", async (req, res) => {
  const { ownername, vehiclenum, services, servicedate } = req.body;
  try {
    let reserve = new Reservation({
      // Capitalized Reservation to match the model
      ownername,
      vehiclenum,
      services,
      servicedate,
    });

    await reserve.save();
    return res.json(reserve);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route    GET api/users/user/:res_id
// @desc     Get reservation by ID
// @access   Public
router.get("/res/:res_id", checkObjectId("res_id"), async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.res_id) // Changed to findById to find by _id
      .populate(["ownername", "vehiclenum"]); // Populate fields directly from the reservation document

    if (!reservation)
      return res.status(400).json({ msg: "Reservation not found" });

    return res.json(reservation);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
});

// @route   PUT api/reservation/update/:id
// @desc    Update a reservation by ID
// @access  Public
router.put("/update/:res_id", async (req, res) => {
  try {
    const { ownername, vehiclenum, services, servicedate, date} = req.body;
    const res_id = req.params.res_id;

    const updatedReservation = {
      ownername,
      vehiclenum,
      services,
      servicedate,
      date,
    };

    const reservation = await Reservation.findByIdAndUpdate(res_id, updatedReservation, { new: true });

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    res.json({ message: "Reservation updated successfully", reservation });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/reservation/delete/:id
// @desc    Delete a reservation by ID
// @access  Public
router.delete("/delete/:res_id", async (req, res) => {
  try {
    const res_id = req.params.res_id;
    const deletedReservation = await Reservation.findByIdAndDelete(res_id);

    if (!deletedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    res.json({ message: "Reservation deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


module.exports = router;
