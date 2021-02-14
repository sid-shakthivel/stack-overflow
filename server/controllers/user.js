const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.getUser = async (req, res, next) => {
    try {
        res.status(200).json({ username: req.user.username });
    } catch (error) {
        res.status(400).json({ success: false });
    }
};

exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find({}).select('username');
        res.status(200).json({ users: users });
    } catch (error) {
        res.status(400).json({ success: false });
    }
};
