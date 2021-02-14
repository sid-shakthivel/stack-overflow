const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const { handleErrors } = require('../helpers/errorHandler');

const User = require('../models/user');

const { SECRET } = require('../env');

exports.postSignup = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) throw errors;

        const user = await User.create({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        });

        const token = await jwt.sign({ userId: user._id }, `${SECRET}`);

        res.cookie('token', token, { httpOnly: true });

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(400).json({ errors: handleErrors(error) });
    }
};

exports.postLogin = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) throw errors;

        const user = await User.findOne({ username: req.body.username });

        const token = await jwt.sign({ userId: user._id }, `${SECRET}`);

        res.cookie('token', token, { httpOnly: true });

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(400).json({ errors: handleErrors(error) });
    }
};

exports.postLogout = async (req, res, next) => {
    res.cookie('token', '', { maxAge: 0 });
    res.status(200).json({});
};
