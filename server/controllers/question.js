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
        res.status(400).json({ success: false });
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

        res.status(200).json({ question: question });
    } catch (error) {
        res.status(400).json({ success: false });
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

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(400).json({ errors: handleErrors(error) });
    }
};

exports.getAnswers = async (req, res, next) => {
    const query = req.params.query;
    try {
        let answers = await Question.findOne({ _id: req.params.questionId })
            .populate({
                path: 'answers.answerId',
                populate: { path: 'userId' },
            })
            .populate({
                path: 'answers.answerId',
                populate: { path: 'comments.userId' },
            })
            .exec();

        if (query === 'votes') {
            answers = answers.answers.sort((a, b) => {
                return (
                    b.answerId.votes.totalVotes - a.answerId.votes.totalVotes
                );
            });
        } else if (query === 'newest') {
            answers = answers.answers.sort((a, b) => {
                return new Date(b.answerId.date) - new Date(a.answerId.date);
            });
        } else {
            answers = answers.answers.sort((a, b) => {
                return new Date(a.answerId.date) - new Date(b.answerId.date);
            });
        }

        res.status(200).json({ answers: answers });
    } catch (error) {
        res.status(400).json({ success: false });
    }
};

exports.getComments = async (req, res, next) => {
    try {
        const question = await Question.findOne({
            _id: req.params.postId,
        })
            .populate('comments.userId')
            .exec();

        res.status(200).json({ comments: question.comments });
    } catch (error) {
        res.status(400).json({ success: false });
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
            date: new Date(),
        });

        await question.save();

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(400).json({ errors: handleErrors(error) });
    }
};
