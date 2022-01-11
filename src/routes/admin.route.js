module.exports = app => {
    const admin = require("../controllers/admin.controller.js");
    const passport = require("passport");
  
    var router = require("express").Router();
  
    router.post("/login",passport.authenticate('local') ,admin.login);
    //router.post("/createAdmin",admin.create);
    router.get("/admin", admin.renderHtml);

  
    app.use('/', router);
  };