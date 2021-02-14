const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
    message: {
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

const answer = mongoose.model('Answer', AnswerSchema);

module.exports = answer;
