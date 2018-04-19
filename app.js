const createError  = require('http-errors');
const express      = require('express');
const path         = require('path');
const cookieParser = require('cookie-parser');
const logger       = require('morgan');
const app          = express();

const indexRouter     = require('./routes/index');
const lingeoRouter    = require('./routes/lingeo');
const migrationRouter = require('./routes/migration');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const passport      = require('passport'),
      session       = require('express-session'),
      LocalStrategy = require('passport-local').Strategy,
      users         = require('./config/users');

passport.use(new LocalStrategy(
  function (username, password, done) {
    if (users.hasOwnProperty(username) && users[username].password === password) {
      return done(null, users[username]);
    }

    return done(null, false, { message: 'Incorrect username or password.' });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  done(null, users[username]);
});

app.use(session({
  secret:            'c8vot|Sq~H9%7iyQD$gqBvirxS-34j)s8+AL5eRSBZ)so3uW,LnbCQNHeVs`f35i',
  resave:            false,
  saveUninitialized: true,
  cookie:            { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('local'));
app.get('/login', (req, res) => {
  if (req.user || req.isAuthenticated()) {
    res.json({
      login: 'success'
    });
  } else {
    res.status(401).json({
      error: 'no_login'
    });
  }
});

const loggedIn = (req, res, next) => {
  if (req.user || req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({
      error: 'no_login'
    });
  }
};

app.use('/', indexRouter);
app.use('/lingeo', loggedIn, lingeoRouter);
app.use('/migration', migrationRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error   = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
