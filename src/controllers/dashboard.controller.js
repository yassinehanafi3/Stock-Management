const flash = require("express-flash");
const db = require("../models");
const Fournisseur = db.fournisseur;
const Client = db.client;
const Stock = db.stock

exports.findAll = async (req, res) => {
    //console.log("inside")
  if (req.isAuthenticated()) {
    console.log("authentified");
    let number_fournisseur = await Fournisseur.findAll({}).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving fournisseur."
        });
      });
      let number_clients = await Client.findAll({}).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving fournisseur."
        });
      });
      let number_stock = await Stock.findAll({}).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving fournisseur."
        });
      });
      data = {}
      data.number_stock = number_stock.length;
      data.page_title = "Dashboard";
      data.analytics = [
        {
            "Nom":"Stock",
            "Desc":"Nombre de produit dans le stock",
            "Number":number_stock.length
        },
          {
              "Nom":"Client",
              "Desc":"Nombre de client",
              "Number":number_clients.length
          },
          {
                "Nom":"Fournisseur",
                "Desc":"Nombre de fournisseur",
                "Number":number_fournisseur.length
            }
      ]
      console.log(data)

      res.render("dashboard",data);

  } else {
    console.log(`No one is logged in`)
    res.redirect('admin')
  }
}
