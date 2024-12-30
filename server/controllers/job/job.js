// controllers/jobController.js

const Job = require('../../models/job');

// Create a new job
const createJob = async (req, res) => {
  try {
    const { jobTitle, jobDescription, salary, experience, applyStartDate, applyEndDate, jobImageUrl, jobLink } = req.body;
    
    if (!jobTitle || !jobDescription || !salary || !experience || !applyStartDate || !applyEndDate || !jobImageUrl || !jobLink) {
      console.log("jobTitle /n"+jobTitle,
        "decription /n"+ jobDescription,"salary /n"+ salary,"exp /n"+ experience, "applyStartDate /n"+ applyStartDate, "applyEndDate /n"+ applyEndDate, "jobImageUrl /n"+ jobImageUrl, "jobLink /n"+ jobLink);
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newJob = new Job({
      jobTitle,
      jobDescription,
      salary,
      experience,
      applyStartDate,
      applyEndDate,
      jobImageUrl,
      jobLink,
    });

    await newJob.save();
    res.status(201).json({ message: 'Job created successfully', job: newJob });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating job backend', error });
  }
};

// Update a job
const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { jobTitle, jobDescription, salary, experience, applyStartDate, applyEndDate, jobImageUrl, jobLink } = req.body;
    
    if (!jobTitle || !jobDescription || !salary || !experience || !applyStartDate || !applyEndDate || !jobImageUrl || !jobLink) {
      return res.status(400).json({ message: 'All fields are required for update backend' });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { jobTitle, jobDescription, salary, experience, applyStartDate, applyEndDate, jobImageUrl, jobLink },
      { new: true }
    );
    
    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found backend' });
    }

    res.status(200).json({ message: 'Job updated successfully', job: updatedJob });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating job backend', error });
  }
};

// Delete a job
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedJob = await Job.findByIdAndDelete(id);
    
    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found backend' });
    }
    
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting job backend', error });
  }
};

// Get all jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching jobs backend', error });
  }
};

module.exports = { createJob, updateJob, deleteJob, getAllJobs };