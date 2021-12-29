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
    id: req.query.id,
    name: req.query.name,
    /*email: req.body.email,
    telephone: req.body.telephone,*/
    pays: req.query.pays,
    /*ville: req.body.ville,
    Adresse_facturation: req.body.Adresse_facturation,
    adresse_livraison: req.body.adresse_livraison,
    date: req.body.date,*/
  };

  Client.create(client)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the client."
      });
    });
};

exports.delete = (req, res) => {
  const id = req.query.id;
  Client.destroy({
    where: { id: id }
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
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving clients."
    });
  });
}