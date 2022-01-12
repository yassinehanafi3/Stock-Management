const passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
const db = require("../src/models");
const Admin = db.admin;
const bcrypt = require("bcrypt");


passport.use(new LocalStrategy((username, password, done)=>{
    console.log(username, password);
        Admin.findOne({where: {Username_admin : username}}).then(data=>{
          if (!data) { 
            return done(null, false, {message : "Username or password does not match"});
          }
          bcrypt.compare(password,data.Password_admin).then(match=>{
              if (match) {
                return done(null, username);
              }
              //console.log("hana")
              return done(null, false, {message : "Username or password does not match"});
            });
        }).catch(err => {
          //console.log("hana")
          return done(err);
        }) 
    
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});
      
passport.deserializeUser(function(user, done) {
  Admin.findOne({ where: { Username_admin: user } })
  .then((user) => {
    done(null, user)
  })
  .catch((err) => {
    
    done(err)
  })
});