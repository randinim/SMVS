const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  ownername: {
    type: String,
    required: true,
  },
  vehiclenum: {
    type: String,
    required: true,
  },
  services: [{
    type: String,
    required: true,
  }],
  servicedate: {
    type: Date,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Reservation = mongoose.model("reservation", reservationSchema);
