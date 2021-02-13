const express = require('express');
const { body } = require('express-validator');

const answerController = require('../controllers/answer');

const { verifyUser } = require('../middleware/verifyUser');

const router = express.Router();

router.post(
    '/',
    verifyUser,
    body('message')
        .not()
        .isEmpty()
        .withMessage('Answer must not be empty')
        .isLength({ min: 5 })
        .withMessage('Answer must be over 5 characters')
        .escape()
        .trim(),
    answerController.postAnswer
);

router.get('/comment/:postId', answerController.getComments);

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
    answerController.postComment
);

module.exports = router;
