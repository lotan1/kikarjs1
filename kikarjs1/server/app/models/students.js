// app/models/user.js

// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var StudentsSchema = mongoose.Schema({

        firstName : String,
        lastName  : String,
        email	  : String,
        password  : String

});

// methods ======================
// generating a hash
StudentsSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
StudentsSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('Students', StudentsSchema);