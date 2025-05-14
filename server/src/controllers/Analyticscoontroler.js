// // const User = require('../models/User');
// const User = require('../models/User')

// const getUsersLoggedInLast6Months = async (req, res) => {
//   try {
//     const sixMonthsAgo = new Date();
//     sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

//     const users = await User.find({
//       loginHistory: { $elemMatch: { $gte: sixMonthsAgo } }
//     });

//     res.json({
//       count: users.length,
//       users: users.map(u => ({ id: u._id, name: u.name, email: u.email }))
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };
// export { getUsersLoggedInLast6Months };

const User = require("../models/User");
const Course = require("../models/Course");
const mongoose = require("mongoose");


const getUsersLoggedInLast6Months = async (req, res) => {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const users = await User.aggregate([
      { $unwind: "$loginHistory" },
      { $match: { loginHistory: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: "$loginHistory" },
            month: { $month: "$loginHistory" }
          },
          userCount: { $addToSet: "$_id" } // unique user count
        }
      },
      {
        $project: {
          month: "$_id.month",
          year: "$_id.year",
          count: { $size: "$userCount" },
          _id: 0
        }
      },
      { $sort: { year: 1, month: 1 } }
    ]);

    res.json({ monthlyLoginStats: users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


const getEnrollmentStats = async (req, res) => {
  try {
    const stats = await User.aggregate([
      { $match: { role: 'student' } },
      { $unwind: "$purchasedCourses" },
      {
        $group: {
          _id: "$purchasedCourses",
          studentCount: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "courses",
          localField: "_id",
          foreignField: "_id",
          as: "course"
        }
      },
      {
        $unwind: "$course"
      },
      {
        $project: {
          _id: 0,
          courseId: "$course._id",
          title: "$course.title",
          studentCount: 1
        }
      }
    ]);

    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating stats");
  }
};
module.exports = { getUsersLoggedInLast6Months, getEnrollmentStats };