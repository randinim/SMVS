const mongoose = require('mongoose');

const advertisementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  images: [String], // Assuming images are stored as URLs
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Advertisement = mongoose.model('Advertisement', advertisementSchema);

module.exports = Advertisement;
