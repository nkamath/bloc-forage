const staticRoutes = require("../routes/static");
const userRoutes = require("../routes/users");
const ingredientRoutes = require("../routes/ingredients");


module.exports = {
    init(app){
      app.use(staticRoutes);
      app.use(userRoutes);
      app.use(ingredientRoutes);
    }
  }