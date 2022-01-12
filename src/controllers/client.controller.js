const db = require("../models");
const Client = db.client;
const path = require('path');

exports.create = (req, res) => {
  console.log(req.body);
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const client = {
    Nom_Client: req.body.name,
    email_client: req.body.email,
    telephone_client: req.body.telephone,
    pays_client: req.body.pays,
    ville_client: req.body.ville,
    adresse_facturation: req.body.adresse_facturation,
    adresse_livraison: req.body.adresse_livraison,
  };

  Client.create(client)
    .then(data => {
      req.flash("success","Client added");
      res.redirect("/clients");
    })
    .catch(err => {
      console.log(err);
      req.flash("error","Some error occurred while creating the client.");
      /*res.status(500).send({
        
      });*/
    });
};

exports.update = (req, res) => {
  const id = req.params.Id;
  console.log(req.query);
  Client.update(req.query, {
    where: { id: id }
  })
    .then(data => {
      if (data) {
        res.send({
          message: "Client was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Client with id=${id}. Maybe Client was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Client with id=" + id
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
		if (req.isAuthenticated()) {
      console.log("authentified");
			Client.findAll({raw: true}).then(data => {
        if(data != null){
          data = {data}
          res.render("clients",data);
        }
        else res.status(400).send({
          message : "Table is clear!"
          
        })
      })
      .catch(err => {
        res.status(500).send({
          message: "Some error occurred while retrieving clients."
        });
      });
		} else {
			console.log(`No one is logged in`)
			res.redirect('admin')
		}
  // conditions can be added to findAll({where : condition})
  
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