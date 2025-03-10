import React, { useState, useEffect, useRef } from 'react';
import './courses.css';
import { getAllCourses } from '../api/landingServices';
import { toast } from 'react-toastify';

// Fallback images in case course doesn't have an image
import defaultAjs from './Ajs.png';
import defaultAws from './aws.png';
import defaultVue from './viewjs.png';
import defaultPbi from './PBI.png';
import defaultPython from './pyh.png';
import defaultReact from './reactjs.png';
import defaultSele from './selenium.png';
import defaultCore from './coreui.png';

const defaultImages = {
  'Angular JS': defaultAjs,
  'AWS': defaultAws,
  'Vue JS': defaultVue,
  'Power BI': defaultPbi,
  'Python': defaultPython,
  'React JS': defaultReact,
  'Software Testing': defaultSele,
  'Core UI': defaultCore
};

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const fetchedCourses = await getAllCourses();
        setCourses(fetchedCourses);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching courses:', err);
        toast.error('Failed to load courses');
        setError(err);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (sectionRef.current) {
          if (entry.isIntersecting) {
            sectionRef.current.classList.add('fade-in-bottom');
          } else {
            sectionRef.current.classList.remove('fade-in-bottom');
          }
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleDownloadSyllabus = (course) => {
    // Check if syllabus exists
    if (!course.syllabus) {
      toast.error('No syllabus available for this course');
      return;
    }

    try {
      // If syllabus is a URL
      if (course.syllabus.startsWith('http')) {
        window.open(course.syllabus, '_blank');
        return;
      }

      // If syllabus is a file path or base64 encoded file
      const link = document.createElement('a');
      link.href = course.syllabus;
      link.download = `${course.title}_Syllabus.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success(`Downloading syllabus for ${course.title}`);
    } catch (error) {
      console.error('Error downloading syllabus:', error);
      toast.error('Failed to download syllabus');
    }
  };

  if (loading) {
    return <div>Loading popular courses...</div>;
  }

  if (error) {
    return <div>Error loading courses: {error.message}</div>;
  }

  return (
    <section ref={sectionRef} className="popular-courses">
      <h2 className="section-titlam">Popular <span>Courses</span></h2>
      <div className="courses-grid">
        {courses.map(course => (
          <div key={course._id} className="course-container">
            <div className="course-card">
              <div className="card-header">
                <img 
                  src={course.coverImage || defaultImages[course.title] || defaultAjs} 
                  alt={`${course.title} Logo`} 
                  className="course-logo" 
                />
              </div>
              <div className="card-body">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">{course.description}</p>
              </div>
            </div>

            <div className="buttons">
              <a href='/coursed' className="btn live-demo">Live Demo</a>
              <a href='/coursed' className="btn enroll-now">Enroll Now</a>
            </div>
            <button 
              className="btn download-curriculum"
              onClick={() => handleDownloadSyllabus(course)}
            >
              Download Curriculum
            </button>
          </div>
        ))}
      </div>
      <button className="view-all-btn">View All Courses</button>
    </section>
  );
};

export default Courses;
