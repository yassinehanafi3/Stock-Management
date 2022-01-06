module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define("admin", {
        id_admin : {
        type : Number,
        autoIncrement: true,
        required: true,
        primaryKey: true
      },
      Username_admin: {
        type: String,
        required: true,
        unique : true,
      },
      Password_admin: {
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
  
    return Admin;
  };