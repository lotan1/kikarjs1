// app/models/user.js

// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var TeachersSchema = mongoose.Schema({

    firstName : String,
    lastName  : String,
    email     : String,
    password  : String,
	isTeacher : { type: Boolean, default: true }


});



// methods ======================
// generating a hash
TeachersSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
TeachersSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('Teachers', TeachersSchema);