module.exports = app => {
    const achat = require("../controllers/achat.controller.js");
  
    var router = require("express").Router();
  
    router.post("/addachat", achat.create);

  
    app.use('/api', router);
  };