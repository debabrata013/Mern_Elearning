const Complaint = require('../models/complaint');

// 1. Create a new complaint
const createComplaint = async (req, res) => {
  try {
    const { name, email, dept, userid, subject, content } = req.body;

    const newComplaint = new Complaint({ name, email, dept, userid, subject, content });
    await newComplaint.save();
    res.status(201).json({ message: 'Complaint created successfully', complaint: newComplaint });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating complaint' });
  }
};

// 2. Get all complaints (both answered and unanswered)
const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({});
    res.status(200).json({ complaints });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching complaints' });
  }
};

// 3. Get answered complaints
const getAnsweredComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ status: 'answered' });
    res.status(200).json({ complaints });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching answered complaints' });
  }
};

// 4. Get unanswered complaints
const getUnansweredComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ status: 'unanswered' });
    res.status(200).json({ complaints });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching unanswered complaints' });
  }
};

// 5. Update complaint (Add replay and change status to answered)
const updateComplaint = async (req, res) => {
  const { complaintId } = req.params; // Get complaint ID from URL parameters
  const { replay } = req.body; // Replay is expected to be in the request body

  try {
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { replay, status: 'answered' },
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    res.status(200).json({ message: 'Complaint answered successfully', complaint: updatedComplaint });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating complaint' });
  }
};

// Export functions
module.exports = {
  createComplaint,
  getComplaints,
  getAnsweredComplaints,
  getUnansweredComplaints,
  updateComplaint
};
