const db = require("../models");
const Fournisseur = db.fournisseur;

exports.create = (req, res) => {
  if (!req.query.societe) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const fournisseur = {
    Societe_fournisseur: req.query.societe,
    contact_fournisseur: req.query.contact,
    adresse_fournisseur: req.query.adresse,
    telephone_fournisseur: req.query.telephone,
    email_fournisseur: req.query.email,
  };

  Fournisseur.create(fournisseur)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the fournisseur."
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.Id;
  Fournisseur.destroy({
    where: { code_fournisseur: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Fournisseur was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Fournisseur with id=${id}. Maybe Fournisseur was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Fournisseur with id=" + id
      });
    });
};

exports.findAll = (req, res) => {

  // conditions can be added to findAll({where : condition})
  Fournisseur.findAll({}).then(data => {
    res.send(data);
      
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while retrieving fournisseurs."
    });
  });
}

exports.findByPk = (req, res) => {
    Fournisseur.findByPk(req.params.Id).then(data => {
    if(data != null){
      res.send(data);
    }
    else res.send({
      message : "Fournisseur not found!"
      
    })
  })
  .catch( err => {
    res.status(400).send({
      message : "Fournisseur not found!"
      
    })
  })
}