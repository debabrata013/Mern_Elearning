import React, { useState } from 'react';
import { PlusCircle, Book, Users, X, Menu, Target, Home } from "lucide-react";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    image: '',
    url: '',
    description: '',
    experience: '',
    salary: '',
    startingDate: '',
    endingDate: '',
  });
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleRemoveCard = (index) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCards([...cards, formData]);
    setIsModalOpen(false); // Close modal after submission
    setFormData({ // Reset the form
      image: '',
      url: '',
      description: '',
      experience: '',
      salary: '',
      startingDate: '',
      endingDate: '',
    });
  };
  const [cards, setCards] = useState([
    {
      image: 'https://via.placeholder.com/300x200',
      url: 'https://example.com/job1',
      description: 'Software Engineer',
      experience: '2-5 years',
      salary: '$80,000 - $120,000',
      startingDate: '2024-01-01',
      endingDate: '2024-12-31',
    },
    {
      image: 'https://via.placeholder.com/300x200',
      url: 'https://example.com/job2',
      description: 'Product Manager',
      experience: '5-8 years',
      salary: '$100,000 - $150,000',
      startingDate: '2024-02-01',
      endingDate: '2024-12-31',
    },
    {
      image: 'https://via.placeholder.com/300x200',
      url: 'https://example.com/job3',
      description: 'UX Designer',
      experience: '3-6 years',
      salary: '$70,000 - $110,000',
      startingDate: '2024-03-01',
      endingDate: '2024-11-30',
    },
  ]);
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-10 shadow-[0px_4px_6px_rgba(0,0,0,0.4)] text-white transition-transform duration-300 ${isMenuOpen ? 'transform-none' : '-translate-x-full'} sm:transform-none sm:relative sm:w-64 sm:block h-screen`}
      >
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center">
            {/* You can put a logo or branding here */}
          </div>
          <button onClick={toggleMenu} className="sm:hidden">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <div className="flex flex-col p-4 h-full">
          <button className="flex items-center mb-4 bg-yellow-500 text-white p-2 rounded">
            <Home className="mr-2" /> Home
          </button>
          <button onClick={() => setIsCourseModalOpen(true)} className="flex items-center mb-4 text-white p-2 bg-blue-600 rounded">
            <PlusCircle className="mr-2" /> Add Course
          </button>
          <button onClick={() => setIsTeacherModalOpen(true)} className="flex items-center mb-4 text-white p-2 bg-green-600 rounded">
            <PlusCircle className="mr-2" /> Add Teacher
          </button>
          <button className="flex items-center mb-4 text-white p-2 bg-purple-600 rounded">
            <Book className="mr-2" /> Manage Courses
          </button>
          <button className="flex items-center mb-4 text-white p-2 bg-yellow-600 rounded">
            <Users className="mr-2" /> Manage Teachers
          </button>
          <button className="flex items-center mb-4 text-white p-2 bg-purple-600 rounded">
            <Target className="mr-2" /> New Job
          </button>
          <button className="flex items-center p-2 bg-red-600 text-white rounded">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-20 p-4">
        <header className="mb-4 flex ">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button
        className="bg-blue-500 text-white p-2 rounded-md ml-11"
        onClick={() => setIsModalOpen(true)}
      >
        Add
      </button>
        </header>
        {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-1/3">
            <h2 className="text-xl font-bold mb-4">Add New Card</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={formData.image}
                onChange={handleChange}
                className="w-full mb-2 p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="url"
                placeholder="URL"
                value={formData.url}
                onChange={handleChange}
                className="w-full mb-2 p-2 border border-gray-300 rounded-md"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full mb-2 p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="experience"
                placeholder="Experience Required"
                value={formData.experience}
                onChange={handleChange}
                className="w-full mb-2 p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="salary"
                placeholder="Salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full mb-2 p-2 border border-gray-300 rounded-md"
              />
              <input
                type="date"
                name="startingDate"
                value={formData.startingDate}
                onChange={handleChange}
                className="w-full mb-2 p-2 border border-gray-300 rounded-md"
              />
              <input
                type="date"
                name="endingDate"
                value={formData.endingDate}
                onChange={handleChange}
                className="w-full mb-4 p-2 border border-gray-300 rounded-md"
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-500 text-white p-2 rounded-md"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded-md"
                >
                  Add Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-6 grid grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div key={index} className="border p-4 rounded-md shadow-lg">
            <img src={card.image} alt="Card" className="w-full h-32 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-bold mb-2">{card.description}</h3>
            <p className="text-sm mb-2"><strong>Experience:</strong> {card.experience}</p>
            <p className="text-sm mb-2"><strong>Salary:</strong> {card.salary}</p>
            <p className="text-sm mb-2"><strong>Start Date:</strong> {card.startingDate}</p>
            <p className="text-sm mb-2"><strong>End Date:</strong> {card.endingDate}</p>
            <a
              href={card.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 mt-4 inline-block"
            >
             Apply 
            </a>
            <button
  className="mt-4 text-red-500 ml-6"
  onClick={() => handleRemoveCard(index)}
>
  Remove Card
</button>

          </div>
        ))}
       
         </div>

      </div>
    </div>
  );
}

export default App;
