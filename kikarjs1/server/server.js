// server.js
// 0 success , 1 error - i/o  , 2 error - connection
// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 4500;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
//var path = require('path');

var async = require('async');
var crypto = require('crypto'); //for generate random token

var TeachersSchema            = require('./app/models/teachers');
var StudentsSchema = require('./app/models/students');


var configDB = require('./config/database.js');

mongoose.connect(configDB.qa); // connect to our database







// configuration ===============================================================

require('./config/passport')(passport); // pass passport for configuration





// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+'\\..'));

// parse application/json
app.use(bodyParser.json());

//app.use(express.static(path.join(__dirname, 'public'))); //redirect to index.html on homepage

app.set('view engine', 'jade'); // set up ejs for templating
app.set('views', __dirname + '/views');
app.set('view options', { layout: false });

// required for passport
app.use(express.session({secret: 'secret'}));
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


// routes ======================================================================
require('./app/routes.js')(app,passport,TeachersSchema,StudentsSchema); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
console.log(__dirname + '\\..');


