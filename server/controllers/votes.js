const Question = require('../models/question');
const Answer = require('../models/answer');

exports.upVote = async (req, res, next) => {
    try {
        let post = null;
        if (req.body.answer) {
            post = await Answer.findOne({ _id: req.body.postId });
        } else {
            post = await Question.findOne({ _id: req.body.postId });
        }

        let voterArray = [...post.votes.voters];

        const voterIndex = voterArray.findIndex((voter) => {
            return voter.userId.toString() === req.user._id.toString();
        });

        if (voterIndex === -1) {
            voterArray.push({
                userId: req.user._id,
                vote: true,
            });
            post.votes.totalVotes += 1;
        } else if (voterArray[voterIndex].vote === false) {
            voterArray[voterIndex].vote = true;
            post.votes.totalVotes += 2;
        } else {
            voterArray = voterArray.filter((voter) => {
                return voter.userId.toString() !== req.user._id.toString();
            });
            post.votes.totalVotes -= 1;
        }

        post.votes.voters = [...voterArray];

        await post.save();

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(400).json({ success: false });
    }
};

exports.downVote = async (req, res, next) => {
    try {
        let post = null;

        if (req.body.answer) {
            post = await Answer.findOne({ _id: req.body.postId });
        } else {
            post = await Question.findOne({ _id: req.body.postId });
        }

        let voterArray = [...post.votes.voters];

        const voterIndex = voterArray.findIndex((voter) => {
            return voter.userId.toString() === req.user._id.toString();
        });

        if (voterIndex === -1) {
            voterArray.push({
                userId: req.user._id,
                vote: false,
            });
            post.votes.totalVotes -= 1;
        } else if (voterArray[voterIndex].vote === true) {
            voterArray[voterIndex].vote = false;
            post.votes.totalVotes -= 2;
        } else {
            voterArray = voterArray.filter(
                (voter) => voter.userId.toString() !== req.user._id.toString()
            );
            post.votes.totalVotes += 1;
        }

        post.votes.voters = [...voterArray];

        await post.save();

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(400).json({ success: false });
    }
};

exports.getTotalVotes = async (req, res, next) => {
    try {
        let post = null;

        if (req.body.answer) {
            post = await Answer.findOne({ _id: req.body.postId });
        } else {
            post = await Question.findOne({ _id: req.body.postId });
        }

        await res.status(200).json({ totalVotes: post.votes.totalVotes });
    } catch (error) {
        res.status(400).json({ success: false });
    }
};
