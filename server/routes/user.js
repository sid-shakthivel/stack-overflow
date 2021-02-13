const express = require('express');

const userController = require('../controllers/user');

const { verifyUser } = require('../middleware/verifyUser');

const router = express.Router();

router.get('/', verifyUser, userController.getUser);

router.get('/all', userController.getUsers);

module.exports = router;
