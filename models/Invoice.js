const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  billingAddress: {
    type: String,
    required: true,
  },
  issuedDate: {
    type: String,
    required: true,
    default: Date.now,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  items: [
    {
      itemName: String,
      price: Number,
      quantity: Number,
      amount: Number,
    },
  ],
  subtotal: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
