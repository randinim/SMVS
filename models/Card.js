const mongoose = require("mongoose");

// Define Card schema
const CardSchema = new mongoose.Schema({
  cardNumber: {
    type: String,
    required: true,
  },

  nameOnCard: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VehicleOwner",
    required: true,
  },
  expiration: {
    type: String,
    required: true,
  },
  ccv: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 3,
  },
});

module.exports = CardPayment = mongoose.model("Card", CardSchema);
