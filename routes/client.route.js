module.exports = app => {
    const client = require("../controllers/client.controller.js");
  
    var router = require("express").Router();
  
    router.post("/addclient", client.create);
    router.delete("/removeclient", client.delete);
    router.get("/allclients", client.findAll);

  
    app.use('/api', router);
  };