const Complaint = require('../models/complaint');

// Utility function for error response
const handleErrorResponse = (res, error, message) => {
  console.error(error);
  return res.status(500).json({ error: message });
};

// 1. Create a new complaint
const createComplaint = async (req, res) => {
  try {
    const { name, email, dept, userid, subject, content } = req.body;

    // Validate required fields
    if (!name || !email || !dept || !userid || !subject || !content) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newComplaint = new Complaint({ name, email, dept, userid, subject, content });
    await newComplaint.save();

    res.status(201).json({ message: 'Complaint created successfully', complaint: newComplaint });
  } catch (error) {
    return handleErrorResponse(res, error, 'Error creating complaint');
  }
};

// 2. Get all complaints (both answered and unanswered)
const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({}).lean();
    res.status(200).json({ complaints });
  } catch (error) {
    return handleErrorResponse(res, error, 'Error fetching complaints');
  }
};

// 3. Get answered complaints
const getAnsweredComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ status: 'answered' }).lean();
    res.status(200).json({ complaints });
  } catch (error) {
    return handleErrorResponse(res, error, 'Error fetching answered complaints');
  }
};

// 4. Get unanswered complaints
const getUnansweredComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ status: 'unanswered' }).lean();
    res.status(200).json({ complaints });
  } catch (error) {
    return handleErrorResponse(res, error, 'Error fetching unanswered complaints');
  }
};

// 5. Update complaint (Add replay and change status to answered)
const updateComplaint = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { replay } = req.body;

    if (!replay) {
      return res.status(400).json({ error: 'Replay message is required' });
    }

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { replay, status: 'answered' },
      { new: true, runValidators: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    res.status(200).json({ message: 'Complaint answered successfully', complaint: updatedComplaint });
  } catch (error) {
    return handleErrorResponse(res, error, 'Error updating complaint');
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
