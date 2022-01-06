const db = require("../models");
const Admin = db.admin;

const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    console.log("Hello world!");
  if (!req.query.username) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const admin = {
    Username_admin: req.query.username,
    Password_admin: req.query.password,
  };
  console.log(admin);
  Username_admin = admin.Username_admin;
  const AdminExists = await Admin.findOne({where: {Username_admin}}).catch(err => {
    console.log("error :",err);
  })
  
  if(!AdminExists){
    res.json({message : "Username or password does not match"});
  } 
  if (AdminExists["dataValues"]["Password_admin"] != admin.Password_admin){
    res.json({message : "Username or password does not match"});
  }
  const token = jwt.sign({username_admin : AdminExists["dataValues"]["Username_admin"]}, "jwtS$%12345ert");
  res.json({message : "Welcome back", token : token});
};
