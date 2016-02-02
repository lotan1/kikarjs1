// config/passport.js

// load all the things we need
var https = require('https');
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var TeachersSchema            = require('../app/models/teachers');
var StudentsSchema = require('../app/models/students');


// load the auth variables
var configAuth = require('./auth');
//for rabitmq
var encoding ="utf8";


// expose this function to our app using module.exports
module.exports = function(passport,services) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        TeachersSchema.findById(id, function(err, user) {
            if(err) done(err);
            if(user)
            {
                done(null,user);
            }
            else{

                StudentsSchema.findById(id, function(err, user) {
                    if(err) done(err);
                    done(null, user);
                });

                }


        });


    });



    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {



        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
		
			
            StudentsSchema.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                console.log("Passport.local-signup: The email "+email+" is already taken!");
                return done(null, false,{msgInfo :{status:"error",statusCode : 1, message : "The email "+email+" is already taken!"}});
            } 
			
		   TeachersSchema.findOne({ 'email' :  email }, function(err, userTeacher) {
				
				if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (userTeacher) {
                console.log("Passport.local-signup: The email "+email+" is already taken!");
                return done(null, false,{msgInfo :{status:"error",statusCode : 1, message : "The email "+email+" is already taken!"}});
            }
				
				
				    var newUser;
					var identity;
					if(req.body.isTeacher){
                    newUser            = new TeachersSchema();
					identity = "teacher";
					}
					else{
					newUser            = new StudentsSchema();	
					identity = "student";
					}
                    // set the user's local credentials
                    newUser.email    = email;
                    newUser.password = newUser.generateHash(password);
					newUser.firstName = req.body.firstName;
					newUser.lastName = req.body.lastName;
                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;

                       
                       
                        console.log("new user "+identity+" created");

                        return done(null, newUser,{msgInfo :{status:"success",statusCode : 0, message : "new user "+identity+" created : "+email+""}});
                        
                        
                    });
				
			});
			

        });    

        });

    }));

     
     // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        
		if(req.body.isTeacher)
		{
			
		TeachersSchema.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, {msgInfo :{status:"error",statusCode : 1, message : "user not found"}}); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, {msgInfo :{status:"error",statusCode : 2, message : "wrong password"}}); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, user, {msgInfo :{status:"success",statusCode : 0, message : "userLoggedIn"}});
        });
		
		}
		else
		{	
		StudentsSchema.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, {msgInfo :{status:"error",statusCode : 1, message : "user not found"}}); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, {msgInfo :{status:"error",statusCode : 2, message : "wrong password"}}); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, user, {msgInfo :{status:"success",statusCode : 0, message : "userLoggedIn"}});
        });
		}

    }));



};