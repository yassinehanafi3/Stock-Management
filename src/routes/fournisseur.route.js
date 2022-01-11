module.exports = app => {
    const fournisseur = require("../controllers/fournisseur.controller.js");
  
    var router = require("express").Router();
  
    router.post("/addfournisseur", fournisseur.create);
    router.delete("/removefournisseur/:Id", fournisseur.delete);
    router.get("/fournisseurs", fournisseur.findAll);
    router.get("/allfournisseurs/:Id", fournisseur.findByPk);

  
    app.use('/', router);
  };