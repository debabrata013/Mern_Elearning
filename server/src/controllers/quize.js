// controllers/quizController.js
const { Quiz, Question, Response } = require('../models/quizModels'); // adjust path as needed

// Create a new quiz with optional questions
exports.createQuiz = async (req, res, next) => {
  try {
    const { title, description, startTime, endTime, questions } = req.body;

    // Create quiz instance; assume req.user._id is the admin's ID
    const quiz = new Quiz({
      title,
      description,
      startTime,
      endTime,
      createdBy: req.user._id,
    });

    // If questions are provided, create and associate them with the quiz
    if (questions && questions.length > 0) {
      const createdQuestions = await Promise.all(
        questions.map(async (q) => {
          const { questionText, options, correctAnswer } = q;
          const question = new Question({
            quizId: quiz._id,
            questionText,
            options,
            correctAnswer,
          });
          await question.save();
          return question._id;
        })
      );
      quiz.questions = createdQuestions;
    }

    await quiz.save();
    res.status(201).json({ message: 'Quiz created successfully', quiz });
  } catch (err) {
    next(err);
  }
};

// Retrieve a quiz by ID, including its questions
exports.getQuizById = async (req, res, next) => {
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findById(quizId).populate('questions');
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json({ quiz });
  } catch (err) {
    next(err);
  }
};

// Update quiz details
exports.updateQuiz = async (req, res, next) => {
  try {
    const { quizId } = req.params;
    const updateData = req.body;
    const quiz = await Quiz.findByIdAndUpdate(quizId, updateData, { new: true });
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json({ message: 'Quiz updated successfully', quiz });
  } catch (err) {
    next(err);
  }
};

// Delete a quiz and its associated questions
exports.deleteQuiz = async (req, res, next) => {
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    // Remove all questions associated with this quiz
    await Question.deleteMany({ quizId: quiz._id });
    await quiz.remove();
    res.status(200).json({ message: 'Quiz and its questions deleted successfully' });
  } catch (err) {
    next(err);
  }
};

// Add a new question to an existing quiz
exports.createQuestion = async (req, res, next) => {
  try {
    const { quizId } = req.params;
    const { questionText, options, correctAnswer } = req.body;
    const question = new Question({
      quizId,
      questionText,
      options,
      correctAnswer,
    });
    await question.save();

    // Update the quiz's question list
    await Quiz.findByIdAndUpdate(quizId, { $push: { questions: question._id } });

    res.status(201).json({ message: 'Question added successfully', question });
  } catch (err) {
    next(err);
  }
};

// Submit a student's quiz response
exports.submitResponse = async (req, res, next) => {
  try {
    const { quizId } = req.params;
    const { answers } = req.body; // answers: array of { questionId, selectedOption }

    // Ensure the student hasn't already submitted for this quiz
    const existingResponse = await Response.findOne({ quizId, studentId: req.user._id });
    if (existingResponse) {
      return res.status(400).json({ message: 'Response already submitted' });
    }

    const response = new Response({
      studentId: req.user._id,
      quizId,
      answers,
    });
    await response.save();
    res.status(201).json({ message: 'Response submitted successfully', response });
  } catch (err) {
    next(err);
  }
};

// Retrieve a student's response for a particular quiz
exports.getResponse = async (req, res, next) => {
  try {
    const { quizId } = req.params;
    const response = await Response.findOne({ quizId, studentId: req.user._id })
      .populate('answers.questionId');
    if (!response) {
      return res.status(404).json({ message: 'Response not found' });
    }
    res.status(200).json({ response });
  } catch (err) {
    next(err);
  }
};
