const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const favicon = require('serve-favicon');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const matchingRouter = require('./routes/matching');
const singlePlayerRouter = require('./routes/singleplayer');
const informationRouter = require('./routes/information');
const contactRouter = require('./routes/contact');
const developerRouter = require('./routes/developer');

const bodyParser = require('body-parser');

const app = express();

app.use(favicon(path.join(__dirname, 'public','favicon.ico')));

let session_opt = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60 * 60 * 1000}
};
app.use(session(session_opt));

app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/matching', matchingRouter);
app.use('/singleplayer', singlePlayerRouter);
app.use('/help',informationRouter);
app.use('/contact',contactRouter);
app.use('/developer',developerRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
