const db = require("../models");
const Achat = db.achat;
const Stock = db.stock;
const Categorie = db.categorie;

exports.create = async (req, res) => {
  if (!req.query.Quantite_Achat) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const achat = {
    Code_fournisseur: req.query.Code_fournisseur,
    N_Stock: req.query.N_Stock,
    Date_Achat: req.query.Date_Achat,
    Quantite_Achat: req.query.Quantite_Achat,
    TVA_Achat: req.query.TVA_Achat,
    Remise_Achat: req.query.Remise_Achat,
  };
  var Libelle_categorie = req.query.Categorie;
  var N_Stock = req.query.N_Stock;

  const StockExist = await Stock.findOne({where: {N_Stock}}).catch(err => {
    console.log("error :",err);
  })
  if (!StockExist){
    console.log("categorie : ",Libelle_categorie);
    var categorie = await Categorie.findOne({where:{Libelle_categorie :Libelle_categorie}}).catch(err => {
        console.log("error :",err);
      })
    var id_categorie = categorie.dataValues.id_categorie;
    const stock = {
        N_Stock : req.query.N_Stock,
        id_admin : 1,
        id_categorie : id_categorie,
        Quantite_total : achat.Quantite_Achat,
        Prix : req.query.prix
    };
    Stock.create(stock)

  }

    if(StockExist) {
            Stock.increment(
                { Quantite_total: +  achat.Quantite_Achat},
                { where: { N_Stock: N_Stock } }
              ).catch(err => {
                //console.log(err)
              res.send({
                message: err.message || "Some error occurred while creating the achat."
              });
            });

    }
    Achat.create(achat).then(data => {
      res.send(data);
    })
    .catch(err => {
          res.send({
            message: err.name || "Some error occurred while creating the achat."
          });
    });
};

exports.findAll = (req, res) => {

  Achat.findAll({}).then(data => {
    if(data != null){
      res.send(data);
    }
    else res.status(400).send({
      message : "Table is clear!"
      
    })
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.name || "Some error occurred while retrieving achats."
    });
  });
}

exports.findByNumeroStock = (req, res) => {
  Achat.findAll({where : {N_Stock : req.params.Id}}).then(data => {
    if(data != null){
      res.send(data);
    }
    else res.status(400).send({
      message : "Article was never bought"
      
    })
  })
  .catch( err => {
    res.status(400).send({
      message : "Article was never bought"
      
    })
  })
}