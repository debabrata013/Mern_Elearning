import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Nav from '../nav-bar/nav';
import Footer from "../footer/footer";
import "./he.css";

const FAQ = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleQuestion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqs = [
    {
      question: 'Who is eligible for this program?',
      answer: 'Any Degree/Btech/BE/Mtech final year, Passed outs, individuals, Employees are eligible for this program.',
    },
    {
      question: 'What is the duration of the program?',
      answer: 'The program duration is flexible and depends on the course structure.',
    },
    {
      question: 'Do I get the assured placement?',
      answer: 'Assured placements depend on meeting certain criteria as outlined in the program details.',
    },
    {
      question: 'What is the basic academic percentage required to enroll for the course?',
      answer: 'The minimum academic percentage is 50% for most courses.',
    },
    {
      question: 'What is the execution plan of the program?',
      answer: 'The execution plan includes structured modules, live sessions, and assessments.',
    },
    {
      question: 'Can we take this course online?',
      answer: 'Yes, the course is available in an online format.',
    },
    {
      question: 'I am already employed, will I be eligible for the program?',
      answer: 'Yes, working professionals are eligible to join the program.',
    },
    {
      question: 'What if I miss the session due to an emergency?',
      answer: 'Recorded sessions are available for participants who miss live sessions.',
    },
    {
      question: 'Do you provide any certificate after the program?',
      answer: 'Yes, a certificate is provided upon successful completion of the program.',
    },
    {
      question: 'Have suggestions for us?',
      answer: 'We welcome feedback to help us improve our services. Feel free to contact us.',
    },
  ];

  return (
    <> 
      <Nav />
      <div className="faq-page-container">
        <div className="faq-container">
          <h1 className="faq-title">Frequently Asked Questions</h1>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button
                  onClick={() => toggleQuestion(index)}
                  className="faq-question"
                >
                  <span className={`question-text ${activeIndex === index ? 'active' : ''}`}>
                    {faq.question}
                  </span>
                  <span className={`toggle-icon ${activeIndex === index ? 'rotate' : ''}`}>
                    {activeIndex === index ? '−' : '+'}
                  </span>
                </button>
                {activeIndex === index && (
                  <div className="faq-answer">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQ;
