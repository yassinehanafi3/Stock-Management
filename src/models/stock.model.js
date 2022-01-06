
module.exports = (sequelize, Sequelize) => {
    const Stock = sequelize.define("Stock", {
        N_Stock : {
        type : Number,
        autoIncrement: true,
        required: true,
        primaryKey: true
      },
      id_admin : {
        type : Number,
        required: true,
        null: false,
        references : {
          model : "admin",
          key : "id_admin"
        },
        unique : false,
      },
      id_categorie : {
        type : Number,
        required: true,
        null: false,
        unique : false,
        references : {
          model : "categorie",
          key : "id_categorie"
        }
      },
      Quantite_total : {
        type : Number,
        required: true,
      },
      Prix : {
        type : Number,
        required: true,
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
  
    return Stock;
  };