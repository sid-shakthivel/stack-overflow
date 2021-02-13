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
});

const answer = mongoose.model('Answer', AnswerSchema);

module.exports = answer;
