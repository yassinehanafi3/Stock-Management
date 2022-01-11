module.exports = (sequelize, Sequelize) => {
  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const Client = sequelize.define("clients", {
    Code_Client : {
      type : Number,
      required: true,
      primaryKey: true,
      autoIncrement : true,
    },
    Nom_Client: {
      type: String,
      required: true,
    },
    adresse_facturation: {
      type: String,
      required: true,
    },
    adresse_livraison: {
      type: String,
      required: false,
    },
    telephone_client: {
      type: String,
      required: true,
    },
    pays_client: {
      type: String,
      required: true,
      unique : false
    },
    ville_client: {
      type: String,
      required: true,
      unique : false,
    },
    email_client: {
      type: String,
      required: true,
      unique : true,
      validate : {isEmail: true},
    },
    createdAt : {
      type : Date,
      default : Date.now,
    },
    updatedAt : {
      type : Date,
      default : Date.now,
    }
  });

  return Client;
};