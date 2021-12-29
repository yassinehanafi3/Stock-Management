module.exports = app => {
    //const client = require("../controllers/client.controller.js");
  
    var router = require("express").Router();
  
    router.get("/home",(req, res)=>{
      res.send(' home page');
    });

  
    app.use('/home', router);
  };