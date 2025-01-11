const Announcement = require('../models/Announcement');

// 1. Create Announcement
const createAnnouncement = async (req, res) => {
  try {
    const newAnnouncement = new Announcement(req.body);
    await newAnnouncement.save();
    res.status(201).json({ message: 'Announcement created', announcement: newAnnouncement });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error creating announcement' });
  }
};

// 2. Get Announcements (by audience or all)
const getAnnouncements = async (req, res) => {
  try {
    const { audience } = req.query; // e.g., ?audience=student or ?audience=teacher
    const query = audience ? { targetAudience: audience } : {};
    const announcements = await Announcement.find(query);
    res.status(200).json({ announcements });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error retrieving announcements' });
  }
};

// 3. Update Announcement
const updateAnnouncement = async (req, res) => {
  const { id } = req.params; // Get ID from URL parameters
  try {
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedAnnouncement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }
    res.status(200).json({ message: 'Announcement updated', announcement: updatedAnnouncement });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error updating announcement' });
  }
};

// 4. Delete Announcement
const deleteAnnouncement = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAnnouncement = await Announcement.findByIdAndDelete(id);
    if (!deletedAnnouncement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }
    res.status(200).json({ message: 'Announcement deleted', announcement: deletedAnnouncement });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error deleting announcement' });
  }
};

// Export functions
module.exports = {
  createAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
};
