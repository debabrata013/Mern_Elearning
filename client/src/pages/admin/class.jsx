import React, { useState } from 'react';
import { Plus, Trash, Eye, Save, RefreshCcw } from 'lucide-react';

// Sample instructor and category options (you can replace these with dynamic data)
const categories = ['Programming', 'Design', 'Business', 'Data Science', 'Marketing'];
const instructors = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Lee'];

const CourseManagementForm = () => {

  const [isVisible, setIsVisible] = useState(false);

  const toggleContent = () => {
    setIsVisible((prevIsVisible) => !prevIsVisible);
  };

  const [formData, setFormData] = useState({
    title: '',
    courseCode: '',
    category: '',
    description: '',
    startDate: '',
    endDate: '',
    duration: '',
    material: null,
    chapters: [{ title: '', description: '' }],
    instructor: '',
    contact: '',
    maxStudents: '',
    enrollmentDeadline: '',
    courseFee: '',
    discount: '',
    publishStatus: 'draft',
  });

  const [savedCourses, setSavedCourses] = useState([]); // To store saved drafts
  const [previewMode, setPreviewMode] = useState(false); // For preview mode

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle chapters (add/remove chapters)
  const handleChapterChange = (index, e) => {
    const { name, value } = e.target;
    const updatedChapters = [...formData.chapters];
    updatedChapters[index][name] = value;
    setFormData({ ...formData, chapters: updatedChapters });
  };

  const addChapter = () => {
    setFormData({
      ...formData,
      chapters: [...formData.chapters, { title: '', description: '' }],
    });
  };

  const removeChapter = (index) => {
    const updatedChapters = formData.chapters.filter((_, i) => i !== index);
    setFormData({ ...formData, chapters: updatedChapters });
  };

  // Reset form fields
  const handleReset = () => {
    setFormData({
      title: '',
      courseCode: '',
      category: '',
      description: '',
      startDate: '',
      endDate: '',
      duration: '',
      material: null,
      chapters: [{ title: '', description: '' }],
      instructor: '',
      contact: '',
      maxStudents: '',
      enrollmentDeadline: '',
      courseFee: '',
      discount: '',
      publishStatus: 'draft',
    });
    setPreviewMode(false); // Reset preview mode
  };

  // Save course as a draft
  const handleSaveDraft = () => {
    setSavedCourses([...savedCourses, formData]);
    handleReset();
  };

  // Preview the course
  const handlePreview = () => {
    setPreviewMode(true);
  };

  // Submit the form (this can be connected to an API or state management)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Course Data Submitted:', formData);
    // Handle actual submission logic here
  };

  return (
    <>
     <button
        onClick={toggleContent}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        {isVisible ? 'Hide Content' : 'Show Content'}
      </button>
      {isVisible && (
    <div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-6">
        {/* 1. Course Details */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Course Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium">Course Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="courseCode" className="block text-sm font-medium">Course Code</label>
              <input
                type="text"
                id="courseCode"
                name="courseCode"
                value={formData.courseCode}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
                required
              >
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <label htmlFor="description" className="block text-sm font-medium">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
                rows="4"
                required
              />
            </div>
          </div>
        </section>

        {/* 2. Schedule & Duration */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Schedule & Duration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium">End Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium">Duration (Weeks)</label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
                required
              />
            </div>
          </div>
        </section>

        {/* 3. Content Management */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Content Management</h3>
          <div>
            <label htmlFor="material" className="block text-sm font-medium">Upload Course Material</label>
            <input
              type="file"
              id="material"
              name="material"
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div className="mt-4">
            <h4 className="font-medium">Add Chapters/Modules</h4>
            {formData.chapters.map((chapter, index) => (
              <div key={index} className="flex items-center gap-4 mb-4">
                <div className="w-full">
                  <label className="block text-sm font-medium">Chapter Title</label>
                  <input
                    type="text"
                    name="title"
                    value={chapter.title}
                    onChange={(e) => handleChapterChange(index, e)}
                    className="mt-1 p-2 border rounded-md w-full"
                    required
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium">Chapter Description</label>
                  <textarea
                    name="description"
                    value={chapter.description}
                    onChange={(e) => handleChapterChange(index, e)}
                    className="mt-1 p-2 border rounded-md w-full"
                    rows="2"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeChapter(index)}
                  className="text-red-600"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addChapter}
              className="flex items-center text-blue-600"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Chapter
            </button>
          </div>
        </section>

        {/* 4. Instructor Details */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Instructor Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="instructor" className="block text-sm font-medium">Instructor Name</label>
              <select
                id="instructor"
                name="instructor"
                value={formData.instructor}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
                required
              >
                <option value="">Select Instructor</option>
                {instructors.map((instructor, index) => (
                  <option key={index} value={instructor}>{instructor}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="contact" className="block text-sm font-medium">Instructor Contact</label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
                required
              />
            </div>
          </div>
        </section>

        {/* 5. Enrollment Settings */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Enrollment Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="maxStudents" className="block text-sm font-medium">Max Students Allowed</label>
              <input
                type="number"
                id="maxStudents"
                name="maxStudents"
                value={formData.maxStudents}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="enrollmentDeadline" className="block text-sm font-medium">Enrollment Deadline</label>
              <input
                type="date"
                id="enrollmentDeadline"
                name="enrollmentDeadline"
                value={formData.enrollmentDeadline}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
                required
              />
            </div>
          </div>
        </section>

        {/* 6. Pricing */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Pricing</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="courseFee" className="block text-sm font-medium">Course Fee</label>
              <input
                type="number"
                id="courseFee"
                name="courseFee"
                value={formData.courseFee}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="discount" className="block text-sm font-medium">Discount</label>
              <input
                type="number"
                id="discount"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
          </div>
        </section>

        {/* 7. Status */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Status</h3>
          <div>
            <label className="block text-sm font-medium">Publish Status</label>
            <div className="flex items-center gap-6">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="publishStatus"
                  value="draft"
                  checked={formData.publishStatus === 'draft'}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span className="ml-2">Draft</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="publishStatus"
                  value="published"
                  checked={formData.publishStatus === 'published'}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span className="ml-2">Published</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="publishStatus"
                  value="archived"
                  checked={formData.publishStatus === 'archived'}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span className="ml-2">Archived</span>
              </label>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="flex gap-4 mt-6">
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400"
          >
            <RefreshCcw className="h-5 w-5 mr-2" />
            Reset
          </button>
          <button
            type="button"
            onClick={handlePreview}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            <Eye className="h-5 w-5 mr-2" />
            Preview
          </button>
          <button
            type="button"
            onClick={handleSaveDraft}
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
          >
            <Save className="h-5 w-5 mr-2" />
            Save Draft
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </section>
      </form>

      {/* Preview */}
      {previewMode && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Course Preview</h2>
          <div className="border p-6 rounded-lg shadow-lg mt-4">
            <h3 className="text-lg font-semibold">{formData.title}</h3>
            <p className="mt-2">{formData.description}</p>
            <div className="mt-4">
              <strong>Instructor:</strong> {formData.instructor}
            </div>
            <div className="mt-2">
              <strong>Duration:</strong> {formData.duration} weeks
            </div>
            <div className="mt-2">
              <strong>Price:</strong> ${formData.courseFee}
            </div>
          </div>
        </div>
      )}

      {/* Saved Drafts */}
      {savedCourses.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Saved Drafts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {savedCourses.map((course, index) => (
              <div key={index} className="border p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold">{course.title}</h3>
                <p>{course.description}</p>
                <div className="mt-2">
                  <strong>Instructor:</strong> {course.instructor}
                </div>
                <div className="mt-2">
                  <strong>Status:</strong> {course.publishStatus}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>)}
    </>
  );
};

export default CourseManagementForm;
