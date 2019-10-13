const Ingredient = require("./models").Ingredient;

module.exports = {
  getAllIngredients(callback){
    return Ingredient.findAll()
    .then((ingredients) => {
      callback(null, ingredients);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getIngredient(id, callback){
    return Ingredient.findByPk(id)
    .then((ingredient) => {
      callback(null, ingredient);
    })
    .catch((err) => {
      callback(err);
    })
  },

  addIngredient(newIngredient, callback){
    return Ingredient.create({
      name: newIngredient.name,
      source: newIngredient.source
    })
    .then((ingredient) => {
      callback(null, ingredient);
    })
    .catch((err) => {
      callback(err);
    })
  },

  deleteIngredient(id, callback){
    return Ingredient.destroy({
      where: {id}
    })
    .then((ingredient) => {
      callback(null, ingredient);
    })
    .catch((err) => {
      callback(err);
    })
  },

  updateIngredient(id, updatedIngredient, callback){
    return Ingredient.findByPk(id)
    .then((ingredient) => {
      if(!ingredient){
        return callback("Ingredient not found");
      }

      ingredient.update(updatedIngredient, {
        fields: Object.keys(updatedIngredient)
      })
      .then(() => {
        callback(null, ingredient);
      })
      .catch((err) => {
        callback(err);
      });
    });
  }
}
