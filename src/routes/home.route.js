module.exports = app => {
  
    var router = require("express").Router();
  
    router.get("/home", (req, res) => {
        res.json("Hello world");
    });

    app.use('/', router);
  };