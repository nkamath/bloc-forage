'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: "must be a valid email" }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  User.associate = function(models) {
    User.hasMany(models.Ingredient, {
      foreignKey: "userId",
      as: "ingredients",
    });
   };
  return User;
};