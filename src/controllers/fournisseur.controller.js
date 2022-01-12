const flash = require("express-flash");
const db = require("../models");
const Fournisseur = db.fournisseur;

exports.create = (req, res) => {
  if (!req.body.societe) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
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
      //req.flash("message","Client added");
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