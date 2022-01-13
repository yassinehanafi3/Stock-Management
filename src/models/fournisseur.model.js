module.exports = (sequelize, Sequelize) => {
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const Fournisseur = sequelize.define("fournisseurs", {
      Code_fournisseur : {
        type : Number,
        autoIncrement: true,
        required: true,
        primaryKey: true
      },
      Societe_fournisseur: {
        type: String,
        required: true,
      },
     contact_fournisseur: {
        type: String,
        required: true,
      },
      adresse_fournisseur: {
        type: String,
        required: false,
        unique : true,
      },
      telephone_fournisseur: {
        type: String,
        required: true,
        unique : {
          args :true,
        msg :"Invalid phone number"
        }
      },
      email_fournisseur: {
        type: String,
        required: true,
        unique : true,
        validate : {isEmail:  {
          args :true,
        msg :"Invalid email"
        }},
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
  
    return Fournisseur;
  };