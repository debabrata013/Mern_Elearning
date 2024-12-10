import React, { useState } from "react";
import "./mentors.css";

const mentors = [
  {
    name: "Ruchika Tuteja",
    occupation: "UI/UX Trainer",
    rating: 4.3,
    reviews: 65,
    modules: 44,
    students: 212,
    description:
      "I have 9 years of experience in Fullstack development. I can provide real-time simulations of various development languages and frameworks by means of multiple projects. Can provide guidance...",
  },
  {
    name: "Sandeep",
    occupation: ".Net & Azure Trainer",
    rating: 4.5,
    reviews: 72,
    modules: 39,
    students: 375,
    description:
      "Sandeep is a Software Developer with expertise in .Net & Azure for more than 24 years. He has trained 100s of students to accomplish their goals and dreams.",
  },
  {
    name: "Sudhansu",
    occupation: "Cloud & Cybersecurity Expert",
    rating: 4.2,
    reviews: 38,
    modules: 27,
    students: 169,
    description:
      "Sudhansu is a Software Developer specializing in Cloud Security, Data Centers, and Forensics for over 22 years. He has helped hundreds of students achieve their aspirations.",
  },
];

const App = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="mentors-container">
      <div className="mentors-title">
        <h2>
          <span className="title-primary">Meet Our Professional</span><br />
          <span className="title-secondary">Mentors & Trainers</span>
        </h2>
      </div>
      <div
        className={`carousel ${isPaused ? "paused" : ""}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="carousel-track">
          {/* Duplicating the mentor cards for infinite loop effect */}
          {mentors.concat(mentors).map((mentor, index) => (
            <div key={index} className="card">
              <div className="card-top">
                <div className="mentor-image"></div>
                <div>
                  <h2 className="mentor-name">{mentor.name}</h2>
                  <p className="mentor-occupation">{mentor.occupation}</p>
                </div>
              </div>
              <div className="mentor-rating">
                {"⭐".repeat(Math.floor(mentor.rating))}
                {"☆".repeat(5 - Math.floor(mentor.rating))} ({mentor.reviews} Reviews)
              </div>
              <div className="mentor-stats">
                <p>
                  <span className="icon">📄</span> {mentor.modules} Modules
                </p>
                <p>
                  <span className="icon">👨‍🎓</span> {mentor.students} Students
                </p>
              </div>
              <p className="mentor-description">{mentor.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
