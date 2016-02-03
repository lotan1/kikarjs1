// app/models/user.js

// load the things we need
var mongoose = require('mongoose');


// define the schema for our user model
var IdeasSchema = mongoose.Schema({
	
		projectId :{ type: String, ref: 'ProjectSchema' },
		creatorStudentId : { type: String, ref: 'Students' },
        name : String,
        text : String,
		linkA : String,
		linkB : String,
		timestamp : { type: Date, default: Date.now },
		groupStudentId : [{ type: String, ref: 'Students' }]
        
        

});


// create the model for users and expose it to our app
module.exports = mongoose.model('IdeasSchema', IdeasSchema);