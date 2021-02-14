const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User',
    },
    comments: [
        {
            message: {
                type: String,
                required: true,
            },
            userId: {
                type: mongoose.Schema.Types.ObjectID,
                ref: 'User',
            },
            date: {
                type: Date,
            },
        },
    ],
    answers: [
        {
            answerId: {
                type: mongoose.Schema.Types.ObjectID,
                ref: 'Answer',
            },
        },
    ],
    votes: {
        voters: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectID,
                },
                vote: {
                    type: Boolean,
                },
            },
        ],
        totalVotes: Number,
    },
    date: {
        type: Date,
    },
});

const question = mongoose.model('Question', QuestionSchema);

module.exports = question;
