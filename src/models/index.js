const dbConfig = require("../../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
    define: {
        freezeTableName: true
    },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.client = require("./client.model.js")(sequelize, Sequelize);
db.fournisseur = require("./fournisseur.model.js")(sequelize, Sequelize);
db.admin = require("./admin.model.js")(sequelize, Sequelize);
db.stock = require("./stock.model.js")(sequelize, Sequelize);
db.achat = require("./achat.model.js")(sequelize, Sequelize);
db.vente = require("./vente.model.js")(sequelize, Sequelize);
db.categorie = require("./categorie.model.js")(sequelize, Sequelize);


// Achat
//db.stock.hasMany(db.achat);
//db.achat.belongsTo(db.stock);
db.fournisseur.hasMany(db.achat, {
    foreignKey: {
        name: 'Code_fournisseur'
    }
});
db.achat.belongsTo(db.fournisseur, {
    foreignKey: {
        name: 'id_Achat'
    }
});

// Vente
//db.stock.hasMany(db.vente);
//db.vente.belongsTo(db.stock);
db.client.hasMany(db.vente, {
    foreignKey: {
        name: 'Code_Client'
    }
});
db.vente.belongsTo(db.client, {
    foreignKey: {
        name: 'Id_Vente'
    }
});

// Stock
db.admin.hasMany(db.stock, {
    foreignKey: {
        name: 'id_admin'
    }
});
db.stock.belongsTo(db.admin, {
    foreignKey: {
        name: 'N_Stock'
    }
});
db.categorie.hasMany(db.stock, {
    foreignKey: {
        name: 'id_categorie'
    }
});

/*db.stock.belongsTo(db.categorie, {
  foreignKey: {
    name: 'id_categorie'
  }
});
*/


module.exports = db;