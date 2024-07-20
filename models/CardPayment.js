const mongoose = require("mongoose");

// Define Address schema
const AddressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
  },
  optional: String,
  city: {
    type: String,
    required: true,
  },
});

// Define CardPayment schema
const CardPaymentSchema = new mongoose.Schema({
  order: {
    cardType: {
      type: String,
      required: true,
    },
    nameOnCard: {
      type: String,
      required: true,
    },
    cardNumber: {
      type: String,
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
  },
  amount: {
    type: Number,
    required: true,
  },
  address: {
    type: AddressSchema,
    required: true,
  },
});

module.exports = CardPayment = mongoose.model("CardPayment", CardPaymentSchema);
