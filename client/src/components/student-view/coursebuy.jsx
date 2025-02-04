import React, { useState } from "react";
import {
  Camera,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  Star,
  User,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./studentComponent/ui/Card";
import { Button } from "./studentComponent/ui/UIComponents";
import { useLocation, useNavigate } from "react-router-dom";

const CourseDetailPage = ({ course = {} }) => {
  const [expandedSection, setExpandedSection] = useState(null);
  const location = useLocation();
  // If a course is passed via location state, override the prop.
  course = location.state || course;
  const navigate = useNavigate();

  const onBack = () => {
    navigate(-1);
  };

  const {
    title = "Complete Web Development Bootcamp",
    instructor = "John Doe",
    rating = 4.8,
    totalRatings = 1234,
    studentsEnrolled = "10,000+",
    lastUpdated = "December 2024",
    duration = "52 total hours",
    price = 94.99,
    description = "Learn web development from scratch with this comprehensive course.",
    color = "bg-blue-600",
  } = course;

  const learningObjectives = [
    "Build 25+ real-world web development projects",
    "Master HTML5, CSS3, and modern JavaScript",
    "Learn React.js and Node.js from scratch",
    "Understand backend development with databases",
    "Deploy your applications to production",
    "Build a professional portfolio of web applications",
  ];

  const courseIncludes = [
    { icon: "📺", text: "52 hours on-demand video" },
    { icon: "📝", text: "75 coding exercises" },
    { icon: "⬇️", text: "45 downloadable resources" },
    { icon: "🏆", text: "Certificate of completion" },
  ];

  const courseContent = [
    {
      title: "Getting Started with Web Development",
      lessons: [
        { title: "Course Introduction", duration: "5:00" },
        { title: "Setting Up Your Development Environment", duration: "15:00" },
        { title: "Web Development Overview", duration: "20:00" },
      ],
    },
    {
      title: "HTML Fundamentals",
      lessons: [
        { title: "HTML Document Structure", duration: "18:00" },
        { title: "Working with Text Elements", duration: "25:00" },
        { title: "HTML Forms and Input", duration: "30:00" },
      ],
    },
  ];

  const reviews = [
    {
      id: 1,
      user: "Sarah M.",
      rating: 5,
      date: "1 week ago",
      comment:
        "Excellent course! The instructor explains everything clearly and the projects are very practical.",
    },
    {
      id: 2,
      user: "Mike R.",
      rating: 4,
      date: "2 weeks ago",
      comment:
        "Very comprehensive course. Good pace and well-structured content.",
    },
  ];

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const renderStars = (ratingValue) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < ratingValue ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12">
      {/* Navigation */}
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back to Courses
      </button>

      {/* Course Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-lg text-gray-700 mb-6">{description}</p>

          <div className="flex flex-wrap items-center gap-6 mb-4">
            <div className="flex items-center">
              {renderStars(rating)}
              <span className="ml-2 font-semibold text-gray-800">{rating}</span>
              <span className="ml-1 text-gray-600">({totalRatings} ratings)</span>
            </div>
            <div className="text-gray-600">{studentsEnrolled} students</div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>Created by {instructor}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>Last updated {lastUpdated}</span>
            </div>
          </div>
        </div>

        {/* Course Card */}
        <Card className="lg:col-span-1 shadow-lg border border-gray-200">
          <CardContent className="p-6">
            <img
              src="/api/placeholder/800/400"
              alt="Course Preview"
              className="w-full rounded-lg mb-6"
            />
            <div className="text-3xl font-bold text-gray-900 mb-6">${price}</div>
            <Button className="w-full mb-3 transition transform hover:scale-105">
              Add to Cart
            </Button>
            <Button variant="outline" className="w-full transition transform hover:scale-105">
              Buy Now
            </Button>

            <div className="mt-8 space-y-4">
              {courseIncludes.map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-gray-700">
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* What You'll Learn */}
      <Card className="shadow-lg border border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">What You'll Learn</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {learningObjectives.map((objective, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-green-500 font-bold">✓</span>
                <span className="text-gray-800">{objective}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Course Content */}
      <Card className="shadow-lg border border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Course Content</CardTitle>
          <div className="text-sm text-gray-600 mt-1">
            {courseContent.length} sections •{" "}
            {courseContent.reduce(
              (acc, section) => acc + section.lessons.length,
              0
            )}{" "}
            lectures • {duration}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {courseContent.map((section, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <button
                  className="w-full p-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                  onClick={() => toggleSection(index)}
                >
                  <div className="flex items-center gap-2">
                    {expandedSection === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                    <h3 className="font-semibold text-gray-800">{section.title}</h3>
                  </div>
                  <span className="text-sm text-gray-600">
                    {section.lessons.length} lectures
                  </span>
                </button>

                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    expandedSection === index ? "max-h-screen" : "max-h-0"
                  }`}
                >
                  {expandedSection === index && (
                    <div className="border-t">
                      {section.lessons.map((lesson, lessonIndex) => (
                        <div
                          key={lessonIndex}
                          className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-3 text-gray-700">
                            <span>▶️</span>
                            <span>{lesson.title}</span>
                          </div>
                          <span className="text-sm text-gray-600">
                            {lesson.duration}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reviews */}
      <Card className="shadow-lg border border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Student Reviews</CardTitle>
          <div className="flex items-center gap-2 mt-1">
            {renderStars(rating)}
            <span className="font-medium text-gray-800">
              {rating} course rating • {totalRatings} ratings
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="border-b pb-6 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-lg text-gray-700">
                    {review.user[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{review.user}</div>
                    <div className="flex items-center gap-2">
                      <div className="flex">{renderStars(review.rating)}</div>
                      <span className="text-sm text-gray-600">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseDetailPage;
