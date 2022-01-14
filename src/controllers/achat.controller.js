const db = require("../models");
const Achat = db.achat;
const Stock = db.stock;
const Categorie = db.categorie;
const Fournisseur = db.fournisseur;

exports.create = async (req, res) => {
  if (!req.body.Quantite_Achat) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  //date = Date(Date.now())

  const achat = {
    Code_fournisseur: req.body.fournisseur,
    N_Stock: req.body.N_Stock,
   // Date_Achat: date,
    Quantite_Achat: req.body.Quantite_Achat,
    TVA_Achat: req.body.TVA_Achat,
    Remise_Achat: req.body.Remise_Achat,
  };
    console.log(achat)

  var Libelle_categorie = req.body.Categorie;
  var N_Stock = req.body.N_Stock;

  const StockExist = await Stock.findOne({where: {N_Stock}}).catch(err => {
    console.log("error :",err);
  })
  if (!StockExist){
    console.log("categorie : ",Libelle_categorie);
    var categorie = await Categorie.findOne({where:{Libelle_categorie :Libelle_categorie}}).catch(err => {
        console.log("error :",err);
      })
    if(categorie == null){
      const cat = {
        Libelle_categorie: Libelle_categorie,
      }
      Categorie.create(cat)
      categorie = await Categorie.findOne({where:{Libelle_categorie :Libelle_categorie}}).catch(err => {
        console.log("error :",err);
      })
      

    }
    console.log(req.user.dataValues.id_admin);
    if (categorie != null){
    var id_categorie = categorie.dataValues.id_categorie;
    const stock = {
        N_Stock : req.body.N_Stock,
        id_admin : req.user.dataValues.id_admin,
        id_categorie : id_categorie,
        Quantite_total : achat.Quantite_Achat,
        Prix : req.body.prix
    };
    Stock.create(stock)
    }
    
    

  }

    if(StockExist) {
            Stock.increment(
                { Quantite_total: +  achat.Quantite_Achat},
                { where: { N_Stock: N_Stock } }
              ).catch(err => {
                console.log(err)
              res.send({
                message: err.message || "Some error occurred while creating the achat."
              });
            });

    }
    Achat.create(achat).then(data => {
      res.redirect("/achats");
    })
    .catch(err => {
          res.send({
            message: err.message || "Some error occurred while creating the achat."
          });
    });
};

exports.findAll = async (req, res) => {
  if (req.isAuthenticated()) {
    console.log("authentified");
  let data = await Achat.findAll({})
  .catch(err => {
    console.log(err)
    res.status(500).send({
      message:
      err || "Some error occurred while retrieving achats."
    });
  });
  if(data != null){
      for (let i=0;i<data.length;i++){
        let four = await Fournisseur.findByPk(data[i].Code_fournisseur).catch(err=>{
          console.log(err);
        });
        data[i].Code_fournisseur = four.dataValues.Societe_fournisseur;
        data[i].Date_Achat = (data[i].Date_Achat).toString().split("GMT")[0]
      }
      data.page_title = "Achats";
      data = {data};

      res.render("achats",data);
    }
    else res.status(400).send({
      message : "Table is clear!"
      
    })
}else {
  console.log(`No one is logged in`)
  res.redirect('admin')
}
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

exports.delete = (req, res) => {
  const id = req.params.Id;
  Achat.destroy({
    where: { id_Achat: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Achat was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Achat with id=${id}. Maybe Achat was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Achat with id=" + id
      });
    });
};