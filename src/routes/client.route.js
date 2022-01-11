module.exports = app => {
    const client = require("../controllers/client.controller.js");
  
    var router = require("express").Router();
  
    router.post("/addclient", client.create);
    router.delete("/removeclient/:Id", client.delete);
    router.get("/clients", client.findAll);
    router.get("/allclients/:Id", client.findByPk);
    //router.get("/clients",client.renderHTML);
    router.put("/updateclient/:Id", client.update)
  
    app.use('/', router);
  };