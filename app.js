require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var ejs = require('ejs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var session = require('express-session');
var engine = require('ejs-mate');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var session = require('express-session');
var Agent = require('./models/agent')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var homesRouter = require('./routes/homes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// ejs-mate
app.engine('ejs', engine)

// connect to databse
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(resp => console.log('Connected to ourHomeApp Database'))
.catch(err => console.log(`Failed to connect to the server due to ${err}`))


app.use(logger('dev'));
app.use(express.json());
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ 
	secret: 'Modash is in charge',
	resave: false,
  	saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(Agent.authenticate())); 

passport.serializeUser(Agent.serializeUser());
passport.deserializeUser(Agent.deserializeUser());

app.use(function(req,res,next){
	res.locals.success = req.session.success || ''
	delete req.session.success
	res.locals.error = req.session.error || ''
	delete req.session.error
	res.locals.currentUser = req.user
	next()
})


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/homes', homesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('index/error');
});

module.exports = app;
