const express = require('express');

const { verifyUser } = require('../middleware/verifyUser');

const votesController = require('../controllers/votes');

const router = express.Router();

router.post('/upVote', verifyUser, votesController.upVote);

router.post('/downVote', verifyUser, votesController.downVote);

router.post('/votes', votesController.getTotalVotes);

module.exports = router;
