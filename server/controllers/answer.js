const { validationResult } = require('express-validator');

const { handleErrors } = require('../helpers/errorHandler');

const Question = require('../models/question');
const Answer = require('../models/answer');

exports.postAnswer = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) throw errors;

        const question = await Question.findOne({ _id: req.body.questionId });

        const answer = await Answer.create({
            message: req.body.message,
            userId: req.user._id,
            comments: [],
            votes: {
                voters: [],
                totalVotes: 0,
            },
        });

        question.answers.push({
            answerId: answer._id,
        });

        await question.save();

        res.json({ success: true });
    } catch (error) {
        res.json({ errors: handleErrors(error) });
    }
};

exports.getComments = async (req, res, next) => {
    try {
        const answer = await Answer.findOne({ _id: req.params.postId })
            .populate('comments.userId')
            .exec();

        res.json({ comments: answer.comments });
    } catch (error) {
        console.log(error);
    }
};

exports.postComment = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) throw errors;

        const answer = await Answer.findOne({ _id: req.body.postId });

        answer.comments.push({
            message: req.body.comment,
            userId: req.user._id,
        });

        await answer.save();

        res.json({ success: true });
    } catch (error) {
        res.json({ errors: handleErrors(error) });
    }
};
