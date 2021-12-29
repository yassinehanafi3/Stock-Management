module.exports = (sequelize, Sequelize) => {
  const Client = sequelize.define("client", {
    id : {
      type : Number,
      required: true,
      primaryKey: true,
    },
    name: {
      type: String,
      required: true,
    },
    pays: {
      type: String,
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

  return Client;
};