// models/job.js

const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    jobTitle: {
      type: String,
      required: true,
    },
    salary: {
      type: String,  // If you want to store it as a number
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    applyStartDate: {
      type: Date,
      required: true,
    },
    applyEndDate: {
      type: Date,
      required: true,
    },
    jobImageUrl: {
      type: String,
      required: true,
    },
    jobLink: {
      type: String,
      required: true,
    }
  }, {
    timestamps: true, // To track when documents are created or modified
  });
  
  const Job = mongoose.model('Job', jobSchema);
  
  module.exports = Job;
  