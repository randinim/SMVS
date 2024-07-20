const mongoose = require("mongoose");

const serviceCenterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true
  },
  contact: {
    type: Number,
    required: true
  },
  
});

module.exports = ServiceCenter = mongoose.model("servicecenter",serviceCenterSchema);
