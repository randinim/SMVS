const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InquirySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "vehicleowners",
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  inquiryType: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Inquiry = mongoose.model("inquiry", InquirySchema);
