const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Admin ID
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
});
const questionSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }], // Multiple options
  correctAnswer: { type: String, required: true }, // Correct option
});
const responseSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  answers: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
      selectedOption: { type: String, required: true }, // Student's selected answer
    }
  ],
  submittedAt: { type: Date, default: Date.now },
});
const Quiz = mongoose.model("Quiz", quizSchema);
const Question = mongoose.model("Question", questionSchema);
const Response = mongoose.model("Response", responseSchema);
module.exports = { Quiz, Question, Response };


