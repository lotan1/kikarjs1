// app/models/user.js

// load the things we need
var mongoose = require('mongoose');


// define the schema for our user model
var ProjectSchema = mongoose.Schema({
	
		teacherId :{ type: String, ref: 'Teachers' },
        name : String,
        text : String,
        minGroup : String,
        maxGroup : String,
        groupCode : {
        type: Number,
        default: function() {
			
			var codeLength = 4;
            var token= Math.floor(Math.random() * (Math.pow(10, (codeLength - 1)) * 9)) + Math.pow(10, (codeLength - 1));
			
            return token;
        }
		}

});


// create the model for users and expose it to our app
module.exports = mongoose.model('ProjectSchema', ProjectSchema);