const passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
const db = require("../src/models");
const Admin = db.admin;
const bcrypt = require("bcrypt");


passport.use(new LocalStrategy(
    function(username, password, done) {
          Admin.findOne({where: {Username_admin : username}}).then(data=>{
            if (!data) { return done("Username or password does not match"); }
            bcrypt.compare(password,data.Password_admin).then(match=>{
                if (match) return done(null, data);
                return done("Username or password does not match"); 
            });
          }).catch(err => {
            return done(err);
          }) 
      }));

passport.serializeUser(function(user, done) {
    done(null, user);
});
      
passport.deserializeUser(function(user, done) {
    done(null, user);
});