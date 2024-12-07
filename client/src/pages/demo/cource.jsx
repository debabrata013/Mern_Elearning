import React, { useState } from 'react';
import { StarIcon } from 'lucide-react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const LessonRow = ({ icon, title, duration, preview }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-700">
      <div className="flex items-center gap-3">
        <div className="text-gray-400">
          {icon}
        </div>
        <span className="text-gray-200">{title}</span>
        {preview && (
          <span className="text-xs text-gray-400 ml-2">({preview})</span>
        )}
      </div>
      <span className="text-sm text-gray-400">{duration}</span>
    </div>
  );
  
const HighlightItem = ({ text }) => (
  <li className="flex items-start gap-2 mb-2">
    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2" />
    <span className="text-gray-300">{text}</span>
  </li>
);

const CourseDetails = () => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="min-h-screen bg-black p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            <div className="relative aspect-video w-full bg-gradient-to-b from-yellow-500 to-yellow-700 rounded-lg overflow-hidden mb-8">
              <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl md:text-5xl font-bold text-black">
                FULL COURSE
              </h1>
            </div>

            <div className="space-y-6">
              <div className="flex space-x-4 border-b border-gray-700 pb-4">
                <button className="text-white font-medium pb-2 border-b-2 border-white">
                  Course Content
                </button>
                <button className="text-gray-400">
                  Reviews
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-white mb-2">
                  <h3>Introduction to Docker</h3>
                  <span className="text-sm text-gray-400">7 Lessons • 35m</span>
                </div>

                <div className="bg-gray-800 rounded-lg shadow-md">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 text-gray-200 bg-gray-700 rounded-t-lg focus:outline-none">
        <span className="text-lg font-semibold">Lecture Videos</span>
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>
      
      {isOpen && (
        <div className="px-4">
          <LessonRow 
            icon="📺"
            title="Introduction"
            duration="1m"
            preview="Preview"
          />
          <LessonRow 
            icon="💬"
            title="Private Discord Invite"
            duration=""
          />
          <LessonRow 
            icon="📺"
            title="Problem of Multiple Dev Env Setup"
            duration="6m"
          />
          <LessonRow 
            icon="📺"
            title="Docker vs Virtualization"
            duration="12m"
          />
          <LessonRow 
            icon="📝"
            title="Quiz 1"
            duration=""
          />
        </div>
      )}
    </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4].map((n) => (
                  <StarIcon 
                    key={n}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                  />
                ))}
                <StarIcon className="w-5 h-5 text-gray-400" />
              </div>
              <span className="text-gray-400">4.6 (21 reviews)</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Docker - Containerisation for Modern Development
            </h2>

            <div className="text-gray-400">
              By: <span className="text-blue-400">Piyush Garg</span>
            </div>

            <p className="text-gray-300 leading-relaxed">
              In this course, you'll learn how to build, ship, and run applications using containers. 
              We cover all key concepts, including containers, images, networking, volumes, Dockerfile, 
              Docker Compose, AWS ECS and ECR, and auto-scaling. Perfect for developers, IT pros, and 
              teams looking to simplify workflows and boost scalability. Start mastering Docker and 
              modern development today with hands-on projects and real-world examples.
            </p>

            <div className="text-3xl font-bold text-white">
              ₹899.00
            </div>

            <div className="flex gap-4">
              <Button className="flex-1 bg-white text-black hover:bg-gray-100">
                Buy now
              </Button>
              <Button variant="outline" className="flex-1">
                Apply Coupon
              </Button>
            </div>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <h3 className="text-xl font-semibold text-white">Highlights</h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <HighlightItem text="Hands-on Projects: Practical, real-world projects to reinforce your learning." />
                  <HighlightItem text="AWS Integration: Deploy containers on AWS using ECS and ECR." />
                  <HighlightItem text="Auto-scaling Techniques with AWS Auto Scaling Groups" />
                  <HighlightItem text="Container Load balancing and Deployment strategies" />
                  <HighlightItem text="Lifetime Access" />
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;