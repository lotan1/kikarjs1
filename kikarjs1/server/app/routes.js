// app/routes.js
var encoding ="utf8";

var msgInfo = {};

module.exports = function(app,passport,TeachersSchema,StudentsSchema,ProjectSchema,IdeaSchema) {



	app.post('/test', function(req,res) {
			
			var test = new ProjectSchema();
			console.log(test);
			
		});
		
		
		
	app.post('/createProject', function(req,res) { //req --> teacherId
			
			console.log("in");
			var project = new ProjectSchema();
			project.teacherId = req.body.teacherId;
			project.name   = req.body.name;
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
			
			var idea = new IdeaSchema();
			idea.projectId = req.body.projectId;
			idea.creatorStudentId = req.body.creatorStudentId
			idea.name = req.body.name
			idea.text = req.body.text;
			idea.linkA = req.body.linkA;
			idea.linkB = req.body.linkA;
			
			idea.save(function(err)
			{
			if(err)
			   throw err
			});
			
			msgInfo = {status:"success",statusCode : 0, message : "idea created"};
			return msgInfo;
			
			
	
	
	});
	
	
	app.post('/getIdeas', function(req,res) { //req ->> projectId
			
		IdeaSchema.find({'projectId':req.body.projectId},function(err,ideas){
			if(err){
				console.log("error");
				throw err;
			}
			
			if(ideas.length <= 0){
				console.log("no ideas to project");
				msgInfo = {status:"success",statusCode : 1, message : "no idea to project"};
				return msgInfo;
			}
			
			msgInfo = {status:"success",statusCode : 0, message : "ideas sent"};
			msgInfo.ideas =  ideas;
			return msgInfo;
			
			
		});	
			
			
	
	
	});
	
	
	app.post('/getProjects', function(req,res) { //req ->> projectId
			
		ProjectSchema.find({},function(err,projects){
			if(err){
				console.log("error");
				throw err;
			}
			
			if(projects.length <= 0){
				console.log("no ideas to project");
				msgInfo = {status:"success",statusCode : 1, message : "no projects"};
				return msgInfo;
			}
			
			msgInfo = {status:"success",statusCode : 0, message : "ideas sent"};
			msgInfo.projects =  projects;
			return msgInfo;
			
			
		});	
			

	});
	
	
	app.post('/joinToIdea', function(req,res) { //req ->> ideaId , studentId(userLoggedIn)  , 
			
			
			
		IdeaSchema.findOne({'_id':req.body.ideaId},function(err,idea){
			if(err){
				console.log("error");
				throw err;
			}
			
			if(!idea){
				console.log("no idea in dataBase");
				msgInfo = {status:"success",statusCode : 1, message : "no idea in dataBase"};
				return msgInfo;
			}
			
			if(idea.creatorStudentId == req.body.studentId){
				console.log("user creator cannot join");
				msgInfo = {status:"success",statusCode : 1, message : "user creator cannot join"};
				return msgInfo;
				
			}
			
			
		ProjectSchema.findOne({'_id':idea.projectId},function(err,project){
	
		  if(err){
				console.log("error");
				throw err;
			}
			
		  if(!project){
				console.log("no project in dataBase");
				msgInfo = {status:"success",statusCode : 1, message : "no project in dataBase"};
				return msgInfo;
			}
		  
		  if(idea.groupStudentId.length  >= project.maxGroup){
				console.log("user cannot join (max group)");
				msgInfo = {status:"success",statusCode : 1, message : "user cannot join (max group)"};
				return msgInfo;
				
			}
			
		  for(var key in idea.groupStudentId){
			  
			  if(idea.groupStudentId[key] == req.body.studentId){
				console.log("user cannot join (already added)");
				msgInfo = {status:"success",statusCode : 1, message : "user cannot join (already added)"};
				return msgInfo; 
			  }
		  }
		  
		  idea.groupStudentId.push(req.body.studentId);
		  idea.markModified('groupStudentId');
          idea.save(function(err){
               if(err)
			   {throw err}
			
          });
		
		console.log("student join");
		msgInfo = {status:"success",statusCode : 0, message : "student join"};
		return msgInfo; 
		
		});
			
			
			
			
		});	
			

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

