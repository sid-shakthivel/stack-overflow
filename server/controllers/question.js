const Question = require('../models/question');
const { validationResult } = require('express-validator');

const { handleErrors } = require('../helpers/errorHandler');

exports.getQuestions = async (req, res, next) => {
    const query = req.params.query;
    try {
        const questions = await Question.find()
            .sort(
                query === 'votes'
                    ? { 'votes.totalVotes': -1 }
                    : query === 'newest'
                    ? { date: -1 }
                    : { date: 1 }
            )
            .populate('userId')
            .exec();

        res.status(200).json({ questions: questions });
    } catch (error) {
        console.log(error);
    }
};

exports.getQuestion = async (req, res, next) => {
    try {
        const questionId = req.params.questionId;

        const question = await Question.findOne({ _id: questionId })
            .populate('userId')
            .populate('comments.userId')
            .populate({
                path: 'answers.answerId',
                populate: { path: 'userId' },
            })
            .populate({
                path: 'answers.answerId',
                populate: { path: 'comments.userId' },
            })
            .exec();

        res.json({ question: question });
    } catch (error) {
        res.json({});
    }
};

exports.postQuestion = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) throw errors;

        const question = await Question.create({
            title: req.body.title,
            description: req.body.description,
            userId: req.user._id,
            comments: [],
            answers: [],
            votes: {
                voters: [],
                totalVotes: 0,
            },
            date: new Date(),
        });

        res.json({ success: true });
    } catch (error) {
        res.json({ errors: handleErrors(error) });
    }
};

exports.getAnswers = async (req, res, next) => {
    try {
        const question = await Question.findOne({ _id: req.params.questionId })
            .populate({
                path: 'answers.answerId',
                populate: { path: 'userId' },
            })
            .populate({
                path: 'answers.answerId',
                populate: { path: 'comments.userId' },
            })
            .exec();

        res.json({ answers: question.answers });
    } catch (error) {
        console.log(error);
    }
};

exports.getComments = async (req, res, next) => {
    try {
        const question = await Question.findOne({
            _id: req.params.postId,
        })
            .populate('comments.userId')
            .exec();

        res.json({ comments: question.comments });
    } catch (error) {
        console.log(error);
    }
};

exports.postComment = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) throw errors;

        const question = await Question.findOne({ _id: req.body.postId });

        question.comments.push({
            message: req.body.comment,
            userId: req.user._id,
        });

        await question.save();

        res.json({ success: true });
    } catch (error) {
        res.json({ errors: handleErrors(error) });
    }
};
