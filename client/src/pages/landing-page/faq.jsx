import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Nav from './nav-bar/nav';
import Fuoter from "./footer/footer"
import "./he.css"
const FAQ = () => {
    const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleQuestion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqs = [
    {
      question: 'Who is eligible for this program?',
      answer:
        'Any Degree/Btech/BE/Mtech final year, Passed outs, individuals, Employees are eligible for this program.',
    },
    {
      question: 'What is the duration of the program?',
      answer:
        'The program duration is flexible and depends on the course structure.',
    },
    {
      question: 'Do I get the assured placement?',
      answer:
        'Assured placements depend on meeting certain criteria as outlined in the program details.',
    },
    {
      question:
        'What is the basic academic percentage required to enroll for the course?',
      answer: 'The minimum academic percentage is 50% for most courses.',
    },
    {
      question: 'What is the execution plan of the program?',
      answer:
        'The execution plan includes structured modules, live sessions, and assessments.',
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
      answer:
        'Recorded sessions are available for participants who miss live sessions.',
    },
    {
      question: 'Do you provide any certificate after the program?',
      answer:
        'Yes, a certificate is provided upon successful completion of the program.',
    },
    {
      question: 'Have suggestions for us?',
      answer:
        'We welcome feedback to help us improve our services. Feel free to contact us.',
    },
  ];

  return (
    <> 
   <Nav/>
   <div className="me">
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-b  to-white py-12">
      <h1 className="mb-8 text-3xl font-bold text-white">
        Frequently Asked Questions
      </h1>
      <div className="w-full max-w-3xl rounded-lg bg-white p-8 shadow-lg">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b">
            <button
              onClick={() => toggleQuestion(index)}
              className="flex w-full items-center justify-between py-4 text-left"
            >
              <span
                className={`font-medium ${
                  activeIndex === index ? 'text-orange-500' : 'text-gray-700'
                }`}
              >
                {faq.question}
              </span>
              <span
                className={`text-2xl ${
                  activeIndex === index ? 'text-orange-500' : 'text-gray-700'
                }`}
              >
                {activeIndex === index ? '−' : '+'}
              </span>
            </button>
            {activeIndex === index && (
              <div className="border-l-4 border-orange-500 px-8 py-4 text-gray-600">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
        
      </div>

      
    </div>
</div>
    <Fuoter/>
    </>
  );
};

export default FAQ;