import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Nav from '../nav-bar/nav';
import Footer from "../footer/footer";

const FAQ = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleQuestion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqs = [
    { question: 'Who is eligible for this program?', answer: 'Any Degree/Btech/BE/Mtech final year, Passed outs, individuals, Employees are eligible for this program.' },
    { question: 'What is the duration of the program?', answer: 'The program duration is flexible and depends on the course structure.' },
    { question: 'Do I get the assured placement?', answer: 'Assured placements depend on meeting certain criteria as outlined in the program details.' },
    { question: 'What is the basic academic percentage required to enroll for the course?', answer: 'The minimum academic percentage is 50% for most courses.' },
    { question: 'What is the execution plan of the program?', answer: 'The execution plan includes structured modules, live sessions, and assessments.' },
    { question: 'Can we take this course online?', answer: 'Yes, the course is available in an online format.' },
    { question: 'I am already employed, will I be eligible for the program?', answer: 'Yes, working professionals are eligible to join the program.' },
    { question: 'What if I miss the session due to an emergency?', answer: 'Recorded sessions are available for participants who miss live sessions.' },
    { question: 'Do you provide any certificate after the program?', answer: 'Yes, a certificate is provided upon successful completion of the program.' },
    { question: 'Have suggestions for us?', answer: 'We welcome feedback to help us improve our services. Feel free to contact us.' },
  ];

  return (
    <> 
      <Nav />
      <div className="faq-page-container mt-4 pt-20 mb-10 bg-white mx-4 sm:mx-6 md:mx-[7.5rem]">

        <div className="flex min-h-screen flex-col items-center px-4 animate__animated animate__fadeIn">

          {/* FAQ Box */}
          <div className="w-full bg-white p-8 shadow-xl border border-[#5491CA] rounded-3xl transition duration-300 hover:shadow-2xl ">
          <h1 className="text-4xl font-bold text-[#5491CA] mb-14 text-center">Frequently Asked Questions</h1>
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item italic border-b last:border-none">
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full flex justify-between italic items-center text-left py-4 px-2 text-lg font-semibold text-[#5491CA] hover:text-[#7670AC] transition duration-200"
                >
                  {faq.question}
                  <motion.span
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block"
                  >
                    ▼
                  </motion.span>
                </button>

                {/* Smooth Animation for Answers */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={activeIndex === index ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="faq-answer p-4 text-gray-700 bg-gray-50 rounded-md shadow-sm">
                    {faq.answer}
                  </div>
                </motion.div>
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
