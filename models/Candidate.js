const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  resumeLink: {
    type: String,
    required: true,
  },
  skills: [String],
  appliedJobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
  },
  applicationDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'interviewed', 'hired', 'rejected'],
    default: 'pending',
  },
});

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
