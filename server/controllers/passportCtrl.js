var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  mongoose = require('mongoose'),
  User = mongoose.model('User');


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    //Do they have an email
    User.findOne({
      email: email
    }, function(findErr, foundUser) {
      if (findErr) {
        done(findErr);
      } else if (foundUser) {
        //now check if the passwords match
        if (foundUser.password === password) {
          //Yay, they logged in.
          delete foundUser.password;
          done(null, foundUser);
        } else {
          //Bad Password
          done(null, null, {
            reason: "Invalid password."
          });
        }
      } else {
        done(null, null, {
          reason: 'Could not find email.'
        });
      }
    });
  }));

//Serialization
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


module.exports = {
  register: function(req, res) {
    User.create(req.body, function(createErr, createResult) {
      if (createErr) {
        res.status(500).json(createErr);
      } else {
        res.json(createResult);
      }
    });
  }
};
