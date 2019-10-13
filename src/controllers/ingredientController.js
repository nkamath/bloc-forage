const ingredientQueries = require("../db/queries.ingredients.js");


module.exports = {
    index(req, res, next) {
        ingredientQueries.getAllIngredients((err, ingredients) => {
            if (err) {
                res.redirect(500, "static/index");
            } else {
                res.render("ingredients/index", {
                  ingredients
                });
            }
        })
    },

    new(req, res, next) {
        res.render("ingredients/new");
    },

    create(req, res, next) {
        let newIngredient = {
            name: req.body.name,
            source: req.body.source
        };
        ingredientQueries.addIngredient(newIngredient, (err, ingredient) => {
            if (err) {
                res.redirect(500, "/ingredients/new");
            } else {
                res.redirect(303, "/ingredients");
            }
        });
    },

    destroy(req, res, next){
      ingredientQueries.deleteIngredient(req.params.id, (err, ingredient) => {
          if(err){
            res.redirect(500, "/ingredients")
          } else {
            res.redirect(303, "/ingredients")
          }
        });
      },

      edit(req, res, next){
        ingredientQueries.getIngredient(req.params.id, (err, ingredient) => {
          if(err || ingredient == null){
            res.redirect(404, "/");
          } else {
            res.render("ingredients/edit", {ingredient});
          }
        });
      },

      update(req, res, next){
        ingredientQueries.updateIngredient(req.params.id, req.body, (err, ingredient) => {
               if(err || ingredient == null){
                 res.redirect(404, `/ingredients/${req.params.id}/edit`);
               } else {
                 res.redirect("/ingredients");
               }
             });
           }
}