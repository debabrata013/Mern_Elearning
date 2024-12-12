const CourseProgress = require('../models/CourseProgress');

// Controller to get course progress for a user
exports.getProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.params;

    const courseProgress = await CourseProgress.findOne({ userId, courseId }).populate('lecturesProgress.lectureId');
    if (!courseProgress) {
      return res.status(404).json({ message: 'Progress not found' });
    }

    res.status(200).json({ message: 'Course progress retrieved successfully', courseProgress });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving course progress', error });
  }
};

// Controller to update course progress for a user
exports.updateProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.params;
    const { lectureId, viewed } = req.body;

    let courseProgress = await CourseProgress.findOne({ userId, courseId });

    if (!courseProgress) {
      courseProgress = new CourseProgress({
        userId,
        courseId,
        lecturesProgress: [{ lectureId, viewed }]
      });
    } else {
      const lectureProgress = courseProgress.lecturesProgress.find(progress => progress.lectureId.toString() === lectureId);
      if (lectureProgress) {
        lectureProgress.viewed = viewed;
        lectureProgress.dateViewed = viewed ? new Date() : null;
      } else {
        courseProgress.lecturesProgress.push({ lectureId, viewed });
      }
    }

    await courseProgress.save();
    res.status(200).json({ message: 'Progress updated successfully', courseProgress });
  } catch (error) {
    res.status(500).json({ message: 'Error updating progress', error });
  }
};
