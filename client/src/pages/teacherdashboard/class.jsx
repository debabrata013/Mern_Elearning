  import React, { useState, useEffect } from 'react';
import { Plus, ArrowLeft, Video, Users, Calendar, Clock, X } from 'lucide-react';
import axios from 'axios';
import { log } from 'react-modal/lib/helpers/ariaAppHider';

const ClassesContent = () => {
    const [view, setView] = useState('courses'); // courses, classes, startClass
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [courses, setCourses] = useState([]); // New state for courses
    const [loading, setLoading] = useState(true); // New state for loading
    const [error, setError] = useState(null); // New state for error handling
    const [classForm, setClassForm] = useState({
        title: '',
        date: '',
        time: '',
        duration: '1',
        description: ''
    });
    const user = JSON.parse(localStorage.getItem('user'));
    const email = user.email;

    // Fetch courses on component mount
    useEffect(() => {
        const fetchCourses = async () => {
            try {

                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:4400/teachers/getallCourse', {
                    headers: {
                        'email': email,
                        'Content-Type': 'application/json'
                    },
                    params: { email }
                });
                
                console.log("data");
                
                console.log(response.data);
                setCourses(response.data.courses);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching courses:', err);
                setError('Failed to fetch courses');
                setLoading(false);
            }
        };

        fetchCourses();
    }, [email]);

    const handleStartClass = () => {
        // Handle starting the live class
        console.log('Starting live class:', classForm);
        // Reset form and go back to classes view
        setClassForm({
            title: '',
            date: '',
            time: '',
            duration: '1',
            description: ''
        });
        setView('classes');
    };

    // Course Card Component
    const CourseCard = ({ course }) => (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gradient-to-r from-[#5491CA]/30 to-[#b1a9f1]/30 relative">
                <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover mix-blend-overlay"
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-[#5491CA]">{course.title}</h3>
                <p className="text-gray-600 mb-2">{course.description}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Users className="h-4 w-4 text-[#b1a9f1]" />
                    <span>{course.studentCount} students</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#5491CA] mb-3">
                    <Calendar className="h-4 w-4" />
                    <span>{course.nextClass}</span>
                </div>
                <button
                    onClick={() => {
                        setSelectedCourse(course);
                        setView('classes');
                    }}
                    className="w-full bg-gradient-to-r from-[#5491CA] to-[#b1a9f1] text-white py-2 rounded-lg hover:shadow-md transition-all"
                >
                    View Classes
                </button>
            </div>
        </div>
    );

    // Live Class Card Component
    const LiveClassCard = ({ liveClass }) => (
        <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h4 className="font-semibold text-lg mb-1 text-[#5491CA]">{liveClass.title}</h4>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-gray-600">
                            <Calendar className="h-4 w-4 text-[#b1a9f1]" />
                            <span>{new Date(liveClass.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                            <Clock className="h-4 w-4 text-[#b1a9f1]" />
                            <span>{liveClass.time}</span>
                        </div>
                    </div>
                </div>
                <span className="bg-gradient-to-r from-[#5491CA]/10 to-[#b1a9f1]/10 text-[#5491CA] px-3 py-1 rounded-full text-sm">
                    {liveClass.duration}
                </span>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-gray-600">
                    <Users className="h-4 w-4 text-[#b1a9f1]" />
                    <span>{liveClass.attendees} attendees</span>
                </div>
                <button className="bg-gradient-to-r from-[#5491CA] to-[#b1a9f1] text-white px-4 py-2 rounded-lg hover:shadow-md transition-all flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    Join Class
                </button>
            </div>
        </div>
    );

    // Render different views
    const renderContent = () => {
        switch (view) {
            case 'classes':
                return (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setView('courses')}
                                    className="text-[#5491CA] hover:text-[#b1a9f1] flex items-center gap-1 transition-colors"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Back to Courses
                                </button>
                                <h3 className="text-xl font-semibold bg-gradient-to-r from-[#5491CA] to-[#b1a9f1] text-transparent bg-clip-text">
                                    {selectedCourse?.title} - Live Classes
                                </h3>
                            </div>
                            <button
                                onClick={() => setView('startClass')}
                                className="bg-gradient-to-r from-[#5491CA] to-[#b1a9f1] text-white px-4 py-2 rounded-lg hover:shadow-md transition-all flex items-center gap-2"
                            >
                                <Video className="h-4 w-4" />
                                Start New Class
                            </button>
                        </div>
                        
                        <div className="grid gap-4">
                            {/* Add sample classes here */}
                        </div>
                    </div>
                );

            case 'startClass':
                return (
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <button
                                onClick={() => setView('classes')}
                                className="text-[#5491CA] hover:text-[#b1a9f1] flex items-center gap-1 transition-colors"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to Classes
                            </button>
                            <h3 className="text-xl font-semibold bg-gradient-to-r from-[#5491CA] to-[#b1a9f1] text-transparent bg-clip-text">
                                Start New Live Class
                            </h3>
                        </div>

                        <form onSubmit={(e) => e.preventDefault()} className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="grid gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="title">
                                        Class Title
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        value={classForm.title}
                                        onChange={(e) => setClassForm(prev => ({ ...prev, title: e.target.value }))}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5491CA] focus:border-[#5491CA]"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="date">
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            id="date"
                                            value={classForm.date}
                                            onChange={(e) => setClassForm(prev => ({ ...prev, date: e.target.value }))}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5491CA] focus:border-[#5491CA]"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="time">
                                            Time
                                        </label>
                                        <input
                                            type="time"
                                            id="time"
                                            value={classForm.time}
                                            onChange={(e) => setClassForm(prev => ({ ...prev, time: e.target.value }))}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5491CA] focus:border-[#5491CA]"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="duration">
                                            Duration (hours)
                                        </label>
                                        <select
                                            id="duration"
                                            value={classForm.duration}
                                            onChange={(e) => setClassForm(prev => ({ ...prev, duration: e.target.value }))}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5491CA] focus:border-[#5491CA]"
                                        >
                                            <option value="0.5">30 minutes</option>
                                            <option value="1">1 hour</option>
                                            <option value="1.5">1.5 hours</option>
                                            <option value="2">2 hours</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">
                                        Class Description
                                    </label>
                                    <textarea
                                        id="description"
                                        value={classForm.description}
                                        onChange={(e) => setClassForm(prev => ({ ...prev, description: e.target.value }))}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5491CA] focus:border-[#5491CA]"
                                        rows={4}
                                    />
                                </div>

                                <div className="flex flex-col gap-4">
                                    <button
                                        onClick={handleStartClass}
                                        className="bg-gradient-to-r from-[#5491CA] to-[#7670AC] text-white py-2 rounded-lg hover:shadow-md transition-all flex items-center gap-2 justify-center"
                                    >
                                        <Video className="h-4 w-4" />
                                        Start Live Class Now
                                    </button>
                                    <button
                                        onClick={handleStartClass}
                                        className="bg-gradient-to-r from-[#b1a9f1] to-[#5491CA] text-white py-2 rounded-lg hover:shadow-md transition-all"
                                    >
                                        Schedule for Later
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                );

            case 'courses':
                if (loading) return <div>Loading courses...</div>;
                if (error) return <div>Error: {error}</div>;
                return (
                    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
                        {courses.map(course => (
                            <CourseCard 
                                key={course._id} 
                                course={{
                                    id: course._id,
                                    title: course.title,
                                    description: course.description,
                                    image: course.image || "/api/placeholder/300/200",
                                    studentCount: course.students?.length || 0,
                                    nextClass: "Upcoming" // You might want to add this to your course model
                                }} 
                            />
                        ))}
                    </div>
                );

            default:
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Add sample courses here */}
                    </div>
                );
        }
    };

    return (
        <div className="bg-gray-50 p-6 rounded-xl">
            {renderContent()}
        </div>
    );
};

export default ClassesContent;