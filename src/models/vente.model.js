module.exports = (sequelize, Sequelize) => {
    const Vente = sequelize.define("Ventes", {
        Id_Vente : {
        type : Number,
        autoIncrement: true,
        required: true,
        primaryKey: true
      },
      Code_client : {
        type : Number,
        required: true,
        null: false,
        references : {
          model : "clients",
          key : "Code_client"
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
      Date_Vente : {
        type : Date,
        required: true,
      },
      Quantite_Vente : {
        type : Number,
        required: true,
      },
      TVA_Vente : {
        type : Number,
        required: true,
      },
      Remise_Vente : {
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
  
    return Vente;
  };

  