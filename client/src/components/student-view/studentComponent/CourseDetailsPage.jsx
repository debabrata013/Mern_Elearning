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
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Button } from "./ui/UIComponents";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";

const CourseDetailPage = ({ course = {} }) => {
  const [expandedSection, setExpandedSection] = useState(null);
  const location = useLocation();
  course = location.state;
  const navigate = useNavigate();
  function onBack() {
    navigate(-1);
  }

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

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Navigation */}
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back to Courses
      </button>

      {/* Course Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <p className="text-lg text-gray-600 mb-4">{description}</p>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              {renderStars(rating)}
              <span className="ml-2 font-medium">{rating}</span>
              <span className="ml-1 text-gray-600">
                ({totalRatings} ratings)
              </span>
            </div>
            <div className="text-gray-600">{studentsEnrolled} students</div>
          </div>

          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              Created by {instructor}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Last updated {lastUpdated}
            </div>
          </div>
        </div>

        {/* Course Card */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6">
            <img
              src="/api/placeholder/800/400"
              alt="Course Preview"
              className="w-full rounded-lg mb-4"
            />
            <div className="text-3xl font-bold mb-4">${price}</div>
            <Button className="w-full mb-3">Add to Cart</Button>
            <Button variant="outline" className="w-full">
              Buy Now
            </Button>

            <div className="mt-6 space-y-4">
              {courseIncludes.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-gray-600"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* What You'll Learn */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>What You'll Learn</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {learningObjectives.map((objective, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-green-500">✓</span>
                <span>{objective}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Course Content */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Course Content</CardTitle>
          <div className="text-sm text-gray-600">
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
              <div key={index} className="border rounded-lg">
                <button
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
                  onClick={() => toggleSection(index)}
                >
                  <div className="flex items-center gap-2">
                    {expandedSection === index ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                    <h3 className="font-semibold">{section.title}</h3>
                  </div>
                  <span className="text-sm text-gray-600">
                    {section.lessons.length} lectures
                  </span>
                </button>

                {expandedSection === index && (
                  <div className="border-t">
                    {section.lessons.map((lesson, lessonIndex) => (
                      <div
                        key={lessonIndex}
                        className="p-4 flex items-center justify-between hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
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
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>Student Reviews</CardTitle>
          <div className="flex items-center gap-2">
            {renderStars(rating)}
            <span className="font-medium">
              {rating} course rating • {totalRatings} ratings
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="border-b last:border-0 pb-6 last:pb-0"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    {review.user[0]}
                  </div>
                  <div>
                    <div className="font-medium">{review.user}</div>
                    <div className="flex items-center gap-2">
                      <div className="flex">{renderStars(review.rating)}</div>
                      <span className="text-sm text-gray-600">
                        {review.date}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseDetailPage;
