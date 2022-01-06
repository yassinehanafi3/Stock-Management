module.exports = (sequelize, Sequelize) => {
    const Achat = sequelize.define("achats", {
        id_Achat : {
        type : Number,
        autoIncrement: true,
        required: true,
        primaryKey: true
      },
      Code_fournisseur : {
        type : Number,
        required: true,
        null: false,
        references : {
          model : "fournisseurs",
          key : "Code_fournisseur"
        }
      },
      N_Stock : {
        type : Number,
        required: true,
        null: false,
        references : {
          model : "stock",
          key : "N_Stock"
        }
      },
      Date_Achat : {
        type : Date,
        required: true,
      },
      Quantite_Achat : {
        type : Number,
        required: true,
      },
      TVA_Achat : {
        type : Number,
        required: true,
      },
      Remise_Achat : {
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
  
    return Achat;
  };

