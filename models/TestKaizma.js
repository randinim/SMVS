const mongoose = require("mongoose");

const KaizmaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
    required: true,
  },

  job: {
    type: String,
    required: true,
  },
});

module.exports = KaizmaTest = mongoose.model("KaizmaTest", KaizmaSchema);
