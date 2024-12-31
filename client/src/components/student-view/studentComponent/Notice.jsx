import React from 'react';

const notices = {
  pending: [
    {
      id: 1,
      title: "Upcoming Hackathon Registration",
      description: "Register for the upcoming hackathon by November 20th.",
      tags: ["Event", "Hackathon"],
      priority: "High",
      postedDate: "2024-11-10",
    },
    {
      id: 2,
      title: "New Course Announcement: Advanced React",
      description: "An advanced React course is launching on December 1st.",
      tags: ["Courses", "React"],
      priority: "Medium",
      postedDate: "2024-11-09",
    },
  ],
  resolved: [
    {
      id: 3,
      title: "Maintenance Downtime Notification",
      description: "The system maintenance scheduled on November 5th was completed successfully.",
      tags: ["System", "Maintenance"],
      resolvedBy: "Admin Team",
      resolvedDate: "2024-11-06",
    },
    {
      id: 4,
      title: "Workshop Feedback Survey",
      description: "The feedback survey for the recent workshop has been closed.",
      tags: ["Survey", "Feedback"],
      resolvedBy: "Event Coordinator",
      resolvedDate: "2024-11-05",
    },
  ],
};

const NoticesSection = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">My Notices</h2>

      {/* Pending Notices */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-black-600 mb-3">📌 Pending Notices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notices.pending.map((notice) => (
            <div key={notice.id} className="bg-white shadow rounded-lg p-4">
              <h4 className="text-lg font-semibold">{notice.title}</h4>
              <p className="text-gray-600 mt-2">{notice.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {notice.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-600 text-xs font-medium py-1 px-2 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Priority: <span className="font-medium text-red-500">{notice.priority}</span>
              </p>
              <p className="text-sm text-gray-500">Posted on: {notice.postedDate}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Resolved Notices */}
      <section>
        <h3 className="text-xl font-semibold text-green-600 mb-3">✅ Resolved Notices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notices.resolved.map((notice) => (
            <div key={notice.id} className="bg-white shadow rounded-lg p-4">
              <h4 className="text-lg font-semibold">{notice.title}</h4>
              <p className="text-gray-600 mt-2">{notice.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {notice.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-600 text-xs font-medium py-1 px-2 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Resolved by: <span className="font-medium">{notice.resolvedBy}</span>
              </p>
              <p className="text-sm text-gray-500">Resolved on: {notice.resolvedDate}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default NoticesSection;

