const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const questionRoutes = require('./routes/question');
const userRoutes = require('./routes/user');
const answerRoutes = require('./routes/answer');
const votesRoutes = require('./routes/votes');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json({ extended: true }));

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);

app.use(cookieParser());

app.use(authRoutes);
app.use(votesRoutes);
app.use('/question', questionRoutes);
app.use('/user', userRoutes);
app.use('/answer', answerRoutes);

// app.post("/findQuestion", async (req, res, next) => {
//   const searchQuery = req.body.searchQuery;
//   const userRegex = new RegExp(searchQuery, "i");
//   const questions = await Question.find({ title: userRegex });

//   return res.render("index", {
//     questions,
//   });
// });

mongoose.connect('mongodb://localhost/stackOverflow', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.listen(8080);
