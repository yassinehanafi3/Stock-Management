module.exports = (sequelize, Sequelize) => {
    const Categorie = sequelize.define("Categorie", {
        id_categorie : {
        type : Number,
        autoIncrement: true,
        required: true,
        primaryKey: true,
        unique: true,
      },
      Libelle_categorie : {
        type : String,
        null : false,
        unique : true,
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
  
    return Categorie;
  };