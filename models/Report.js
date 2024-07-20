const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  creator: { type: String, required: true },
  comments: { type: String },
  pdf: { type: String, default: null }, // Store PDF filename
});

const ReportModel = mongoose.model("report", ReportSchema);
module.exports = ReportModel;
