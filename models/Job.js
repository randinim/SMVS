const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: [String],
  location: {
    type: String,
    required: true,
  },
  salaryRange: String,
  postedDate: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
