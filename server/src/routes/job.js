// routes/jobRoutes.js

const express = require('express');
const { createJob, updateJob, deleteJob, getAllJobs } = require('../controllers/job/job');

const router = express.Router();

// Route to create a new job
router.post('/', createJob);

// Route to get all jobs
router.get('/', getAllJobs);

// Route to update a specific job by id
router.put('/:id', updateJob);

// Route to delete a job by id
router.delete('/:id', deleteJob);

module.exports = router;
