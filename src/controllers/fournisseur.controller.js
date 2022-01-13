const flash = require("express-flash");
const db = require("../models");
const Fournisseur = db.fournisseur;

exports.create = (req, res) => {
  if (!req.body.societe) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const fournisseur = {
    Societe_fournisseur: req.body.societe,
    contact_fournisseur: req.body.contact,
    adresse_fournisseur: req.body.adresse,
    telephone_fournisseur: req.body.telephone,
    email_fournisseur: req.body.email,
  };

  Fournisseur.create(fournisseur)
    .then(data => {
      res.redirect("/fournisseurs");
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
  if (req.isAuthenticated()) {
    console.log("authentified");
    Fournisseur.findAll({}).then(data => {
      data.page_title = "Fournisseurs";
      data = { data }
      res.render("fournisseurs", data);
    })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving fournisseurs."
        });
      });
  } else {
    console.log(`No one is logged in`)
    res.redirect('admin')
  }
}

exports.findByPk = (req, res) => {
  Fournisseur.findByPk(req.params.Id).then(data => {
    if (data != null) {
      res.send(data);
    }
    else res.send({
      message: "Fournisseur not found!"

    })
  })
    .catch(err => {
      res.status(400).send({
        message: "Fournisseur not found!"

      })
    })
}

exports.update = (req, res) => {
  const id = req.params.Id;
  let field = res.req.body.conceptName
  if (field == "Societe_fournisseur"){
    query = {"Societe_fournisseur":res.req.body.updatedValue}
  }else if (field == "email_fournisseur"){
				query = {"email_fournisseur":res.req.body.updatedValue}
			}else if(field == "adresse_fournisseur") {
				query = {"adresse_fournisseur":res.req.body.updatedValue}
			}else if(field == "telephone_fournisseur") {
				query = {"telephone_fournisseur":res.req.body.updatedValue}
			}else if(field == "contact_fournisseur") {
				query = {"contact_fournisseur":res.req.body.updatedValue}
			}

  Fournisseur.update(query, {
    where: { Code_Fournisseur: id }
  })
    .then(data => {
      if (data) {
        res.send({
          message: "Fournisseur was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Fournisseur with id=${id}. Maybe Fournisseur was not found or req.body is empty!`
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