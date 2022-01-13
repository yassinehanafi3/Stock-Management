const db = require("../models");
//const Admin = db.admin;
//const path = require('path');
//const bcrypt = require("bcrypt");
//const saltRounds = 10; 

exports.logout = (req, res) =>{
      req.logout();
      res.send("Disconnected");
    }

exports.login = (req, res) => {
  res.redirect("/dashboard");
};
exports.renderHtml = (req, res) => {
  res.render("admin");
}
/*
exports.create = async (req, res) => {
  const admin = {
    Username_admin : req.query.username,
    Password_admin : req.query.password
  };
  admin.Password_admin = (await bcrypt.hash(admin.Password_admin,saltRounds)).toString();
  Admin.create(admin)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:err
      });
    });
}*/
