const express = require('express');
const { body } = require('express-validator');

const questionController = require('../controllers/question');

const { verifyUser } = require('../middleware/verifyUser');

const router = express.Router();

router.get('/all/:query', questionController.getQuestions);

router.get('/:questionId', questionController.getQuestion);

router.post(
    '/',
    body('title')
        .not()
        .isEmpty()
        .withMessage('Title cannot be empty')
        .isLength({ min: 5 })
        .withMessage('Title must be between 5-20 letters')
        .escape()
        .trim(),
    body('description')
        .not()
        .isEmpty()
        .withMessage('Description cannot be empty')
        .isLength({ min: 5 })
        .withMessage('Description must have at least 5 letters')
        .escape()
        .trim(),
    verifyUser,
    questionController.postQuestion
);

router.get('/comment/:postId', questionController.getComments);

router.get('/answers/:questionId/:query', questionController.getAnswers);

router.post(
    '/comment',
    verifyUser,
    body('comment')
        .not()
        .isEmpty()
        .withMessage('Comment cannot be empty')
        .isLength({ min: 3 })
        .withMessage('Comment must be have at least 3 letters')
        .escape()
        .trim(),
    questionController.postComment
);

module.exports = router;
