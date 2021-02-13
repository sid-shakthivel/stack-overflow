const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { SECRET } = require('../env');

exports.verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        const userId = await jwt.verify(token, `${SECRET}`);
        const user = await User.findOne({ _id: userId.userId });
        req.user = user;
        next();
    } catch (error) {
        res.json({ errors: ['Please sign in'] });
    }
};
