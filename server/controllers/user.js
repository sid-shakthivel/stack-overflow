const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.getUser = async (req, res, next) => {
    try {
        res.json({ username: req.user.username });
    } catch (error) {
        res.json({ success: false });
    }
};

exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find({}).select('username');
        res.json({ users: users });
    } catch (error) {
        res.json({ success: false });
    }
};
