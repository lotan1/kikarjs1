// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '902358869852118', 
        'clientSecret'  : 'a65d7f253772de4140e5d698e7d0507c',
        'callbackURL'   : 'http://dev.boscoapp.com/auth/facebook/callback'
    },

    'googleAuth' : {
        'clientID'      : '307974375530-rbc23nj3prd2ej8s5lud2fv31o9kvfn5.apps.googleusercontent.com',
        'clientSecret'  : 'YBGV_33W6tWlQHqczaX2qfHW',
        'callbackURL'   : 'http://dev.boscoapp.com/auth/google/callback'
    }

};

