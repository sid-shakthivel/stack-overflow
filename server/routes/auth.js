const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');

const authController = require('../controllers/auth');

const router = express.Router();

router.post(
    '/signup',
    body('password')
        .not()
        .isEmpty()
        .withMessage('Password must not be empty')
        .isLength({ min: 8 })
        .withMessage('Password must be 8 characters')
        .matches(/\d/)
        .withMessage('Password must contain a number')
        .trim()
        .escape(),
    body('username')
        .not()
        .isEmpty()
        .withMessage('Username must not be empty')
        .isLength({ max: 20 })
        .withMessage('Username must be under 8 characters')
        .custom(async (username, { req }) => {
            const user = await User.findOne({ username: username });
            if (user !== null) {
                throw 'User with that username exists';
            }
            return true;
        })
        .trim()
        .escape(),
    body('email')
        .not()
        .isEmpty()
        .withMessage('Email must not be empty')
        .isEmail()
        .withMessage('Value entered is not an email')
        .custom(async (email, { req }) => {
            const user = await User.findOne({ email: email });
            if (user !== null) {
                throw 'User with that email exists';
            }
            return true;
        })
        .trim()
        .escape()
        .normalizeEmail(),
    authController.postSignup
);

router.post(
    '/login',
    body('username')
        .not()
        .isEmpty()
        .withMessage('Username must not be empty')
        .custom(async (username, { req }) => {
            const user = await User.findOne({ username: username });
            if (user === null) {
                throw 'User with that username does not exists';
            }
            return true;
        })
        .trim()
        .escape(),
    body('password')
        .not()
        .isEmpty()
        .withMessage('Password must not be empty')
        .custom(async (password, { req }) => {
            const user = await User.findOne({ username: req.body.username });
            console.log(user);
            if (user.password !== password) {
                throw 'Password does not match';
            }
            return true;
        })
        .trim()
        .escape(),
    authController.postLogin
);

router.post('/logout', authController.postLogout);

module.exports = router;
