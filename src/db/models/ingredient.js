'use strict';
module.exports = (sequelize, DataTypes) => {
  var Ingredient = sequelize.define('Ingredient', {
    name: DataTypes.STRING,
    source: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "Users",
        key: "id",
        as: "userId",
      }
    }
  }, {});
  Ingredient.associate = function(models) {
    Ingredient.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "SET NULL",
    });
 };
  return Ingredient;
};