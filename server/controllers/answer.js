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
            date: new Date(),
        });

        question.answers.push({
            answerId: answer._id,
        });

        await question.save();

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(400).json({ errors: handleErrors(error) });
    }
};

exports.getComments = async (req, res, next) => {
    try {
        const answer = await Answer.findOne({ _id: req.params.postId })
            .populate('comments.userId')
            .exec();

        res.status(200).json({ comments: answer.comments });
    } catch (error) {
        res.status(400).json({ success: false });
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
            date: new Date(),
        });

        await answer.save();

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(400).json({ errors: handleErrors(error) });
    }
};
