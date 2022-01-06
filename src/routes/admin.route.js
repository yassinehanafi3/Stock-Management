module.exports = app => {
    const admin = require("../controllers/admin.controller.js");
  
    var router = require("express").Router();
  
    router.post("/login", admin.login);

  
    app.use('/admin', router);
  };