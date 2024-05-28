const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const createError = require('http-errors');


const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://meethabaap0:dharmesh123@cluster0.0b7auxy.mongodb.net/resume-builder', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const indexRouter = require('./routes/index');
//const adminRouter = require('./routes/admin'); // Import the admin router

const app = express();

app.use(session({
  secret: 'hii hello',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ url: 'mongodb+srv://meethabaap0:dharmesh123@cluster0.0b7auxy.mongodb.net/resume-builder' })
}));

app.use(express.json))

app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));


app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRouter);
//app.use('/admin', adminRouter); // Mount the admin router under the /admin prefix

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
