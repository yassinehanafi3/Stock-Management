const db = require("../models");
const Client = db.client;
const path = require('path');

exports.create = (req, res) => {
  
  if (req.body.name == "" || req.body.email == "" || req.body.phone == "" || req.body.pays == "" || req.body.ville == "" || req.body.fact =="" || req.body.livr =="") {
    res.send({
      message: "Input ne peut pas etre vide!"
    });
    return;
  }else {
    const client = {
        Nom_Client: req.body.name,
        email_client: req.body.email,
        telephone_client: req.body.telephone,
        pays_client: req.body.pays,
        ville_client: req.body.ville,
        adresse_facturation: req.body.adresse_facturation,
        adresse_livraison: req.body.adresse_livraison,
      };
      console.log(client)
      Client.create(client)
        .then(data => {
          res.redirect("clients");
        })
        .catch(err => {
          console.log(err.message);
          res.send({message : "Some error occurred while creating the client."});
        });
  }
  
};

exports.update = (req, res) => {
  const id = req.params.Id;
  let field = res.req.body.conceptName
  if (field == "Nom_Client"){
    query = {"Nom_Client":res.req.body.updatedValue}
  }else if (field == "email_client"){
				query = {"email_client":res.req.body.updatedValue}
			}else if(field == "adresse_livraison") {
				query = {"adresse_livraison":res.req.body.updatedValue}
			}else if(field == "telephone_client") {
				query = {"telephone_client":res.req.body.updatedValue}
			}

  Client.update(query, {
    where: { Code_Client: id }
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
      console.log(err.message)
      res.send({
        message: err.message
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
			Client.findAll({raw: true}).then(data => {
        if(data != null){
          data.page_title = "Clients";
          data = {data}
          res.render("clients",data);
        }
        else res.status(400).send({
          message : "Table is clear!"
          
        })
      })
      .catch(err => {
        res.send({
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