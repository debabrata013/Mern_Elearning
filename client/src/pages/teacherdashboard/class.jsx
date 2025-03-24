import React, { useState, useEffect } from 'react';
import { Users, Calendar } from 'lucide-react';
import axios from 'axios';

const ClassesContent = () => {
    const [view, setView] = useState('courses'); // courses, classes, startClass
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const user = JSON.parse(localStorage.getItem('user'));
    const email = user?.email;

    useEffect(() => {
        if (!email) return;
        
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`http://localhost:4400/teachers/get?email=${email}`);
                setCourses(response.data);
            } catch (err) {
                console.error('Error fetching courses:', err);
                setError('Failed to fetch courses');
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [email]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    };

    const CourseCard = ({ course }) => (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all">
            <div className="h-48 bg-gradient-to-r from-[#5491CA]/30 to-[#b1a9f1]/30 relative">
                <img 
                    src={course.coverImage} 
                    alt={course.title} 
                    className="w-full h-full object-cover mix-blend-overlay"
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-[#5491CA]">{course.title}</h3>
                <p className="text-gray-600 mb-2">{course.description || "No description available."}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Users className="h-4 w-4 text-[#b1a9f1]" />
                    <span>{course.maxStudents} students</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#5491CA] mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(course.startDate)} - {formatDate(course.endDate)}</span>
                </div>
                <button
                    onClick={() => {
                        if (view !== "classes") {
                            setSelectedCourse(course);
                            setView("classes");
                        }
                    }}
                    className="w-full bg-gradient-to-r from-[#5491CA] to-[#b1a9f1] text-white py-2 rounded-lg hover:shadow-md transition-all"
                >
                    View Course
                </button>
            </div>
        </div>
    );

    return (
        <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-2xl font-bold mb-6">Courses</h3>
            
            {loading ? (
                <p className="text-gray-500 text-center">Loading courses...</p>
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : courses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map(course => (
                        <CourseCard 
                            key={course._id || course.courseCode} 
                            course={course}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-center">Not assign any course</p>
            )}
        </div>
    );
};

export default ClassesContent;