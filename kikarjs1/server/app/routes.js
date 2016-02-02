// app/routes.js
var encoding ="utf8";

var msgInfo = {};

module.exports = function(app,passport,TeachersSchema,StudentsSchema,ProjectSchema) {



	app.post('/test', function(req,res) {
			
			var test = new ProjectSchema();
			console.log(test);
			
		});
		
		
		
	app.post('/createProject', function(req,res) { //req --> teacherId
			
			var project = new ProjectSchema();
			project.teacherId = req.body.teacherId;
			project.name   = req.body.teacherId;
			project.text = req.body.text;
			project.minGroup = req.body.minGroup;
			project.maxGroup = req.body.maxGroup;
			project.state = 0;
			
			project.save(function(err)
			{
			if(err)
			   throw err
			});
			
			msgInfo = {status:"success",statusCode : 0, message : "project created"};
			return msgInfo;
			
			
	
	
	});


	app.post('/createIdea', function(req,res) {
			
			var test = new Idea();
			console.log(test);
			
	
	
	});
		



	app.post('/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user, info) {
            if (err) { return next(err); }
			
            if (!user) {

                var status = info.msgInfo;
                return res.json(status);

            }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                
				console.log("user logged in");
				msgInfo = {status:"success",statusCode : 0, message : "userLoggedIn"}
				msgInfo.user = user;
				return res.send(msgInfo);
				
				
                });
                
                
            
        })(req, res, next);
    });


    // SIGNUP
    app.post('/signup', function(req, res, next) {
        passport.authenticate('local-signup', function(err, user, info) {
            if (err) { return next(err); }



            if (!user) {
                var status = info.msgInfo;
                return res.json(status)
            }



            req.logIn(user, function(err)
            {
                if (err) { return next(err); }
				msgInfo = {status:"success",statusCode : 0, message : "userLoggedIn"};
                msgInfo.user = user;
                return res.json(msgInfo);
                
            });
        })(req, res, next);
    });
    
	
	  


    
    

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {



    //if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
    console.log("session closed");
    // if they aren't redirect them to the home page
    res.redirect('/');
}

