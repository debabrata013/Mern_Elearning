const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quize');

// Quiz routes
router.post('/', quizController.createQuiz);
router.get('/:quizId', quizController.getQuizById);
router.put('/:quizId', quizController.updateQuiz);
router.delete('/:quizId', quizController.deleteQuiz);

// Question routes
router.post('/:quizId/question', quizController.createQuestion);

// Response routes
router.post('/:quizId/response', quizController.submitResponse);
router.get('/:quizId/response', quizController.getResponse);

module.exports = router;
