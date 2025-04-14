import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import axiosInstance from "@/api/axiosInstance"; // Ensure axiosInstance is configured correctly

const AssignmentQuiz = () => {
  const { assignmentId } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user"))); // Fetch user from localStorage

  // Fetching assignment details on component mount
  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const res = await axiosInstance.get(`/api/student/assignments/${assignmentId}`);
        setAssignment(res.data[0]); // Assuming the response contains an array with one object
      } catch (err) {
        console.error("Error fetching assignment:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [assignmentId]);

  // Handle radio button change for answers
  const handleOptionChange = (qIndex, optIndex) => {
    setAnswers({ ...answers, [qIndex]: optIndex });
  };

  // Handle assignment submission
  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const response = await axiosInstance.post(`/api/student/assignment/${assignmentId}/submit`, {
        answers: answers,
        userid: user._id, // Pass user ID to the backend
      });
      if (response.status === 201) {
        setSubmitted(true); // Mark assignment as submitted
      }
    } catch (err) {
      console.error("Error submitting assignment:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // Display loading state
  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-500">
        <Loader2 className="mx-auto animate-spin" />
        Loading Assignment...
      </div>
    );
  }

  // Display success message after submission
  if (submitted) {
    return (
      <div className="text-center mt-10 text-green-600 text-xl font-bold">
        ✅ Assignment Submitted Successfully!
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-6">
      <h2 className="text-2xl font-bold mb-6 text-[#5491CA]">
        🧠 {assignment.title}
      </h2>

      <form className="space-y-8">
        {/* Loop through the questions */}
        {assignment.questions.map((q, qIndex) => (
          <div key={qIndex} className="bg-gray-50 p-4 rounded-xl border">
            <h3 className="font-semibold mb-3">
              Q{qIndex + 1}. {q.questionText}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* Loop through the options for each question */}
              {q.options.map((option, optIndex) => (
                <label
                  key={optIndex}
                  className={`flex items-center gap-2 p-2 border rounded cursor-pointer transition ${
                    answers[qIndex] === optIndex
                      ? "bg-[#d0e5ff] border-[#5491CA]"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${qIndex}`}
                    checked={answers[qIndex] === optIndex}
                    onChange={() => handleOptionChange(qIndex, optIndex)} // Handle option change
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* Submit button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full mt-4 bg-[#5491CA] hover:bg-[#3e6ca8] text-white py-2 px-4 rounded transition flex justify-center items-center"
        >
          {submitting ? (
            <>
              <Loader2 className="animate-spin mr-2" />
              Submitting...
            </>
          ) : (
            "Submit Assignment"
          )}
        </button>
      </form>
    </div>
  );
};

export default AssignmentQuiz;
