const db = require("../models");
const Client = db.client;

exports.create = (req, res) => {
  if (!req.query.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const client = {
    Nom_Client: req.query.name,
    email_client: req.query.email,
    telephone_client: req.query.telephone,
    pays_client: req.query.pays,
    ville_client: req.query.ville,
    adresse_facturation: req.query.adresse_facturation,
    adresse_livraison: req.query.adresse_livraison,
  };

  Client.create(client)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.errors[0].message || "Some error occurred while creating the client."
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.Id;
  Client.destroy({
    where: { code_client: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Client was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Client with id=${id}. Maybe Client was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Client with id=" + id
      });
    });
};

exports.findAll = (req, res) => {

  // conditions can be added to findAll({where : condition})
  Client.findAll({}).then(data => {
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
      err.errors[0].message || "Some error occurred while retrieving clients."
    });
  });
}

exports.findByPk = (req, res) => {
  Client.findByPk(req.params.Id).then(data => {
    if(data != null){
      res.send(data);
    }
    else res.status(400).send({
      message : "Client not found!"
      
    })
  })
  .catch( err => {
    res.status(400).send({
      message : "Client not found!"
      
    })
  })
}