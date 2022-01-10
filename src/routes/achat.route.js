module.exports = app => {
    const achat = require("../controllers/achat.controller.js");
  
    var router = require("express").Router();
  
    router.post("/addachat", achat.create);
    router.get("/getachat", achat.findAll);
    router.get("/getachat/article/:Id", achat.findByNumeroStock);
  
    app.use('/api', router);
  };