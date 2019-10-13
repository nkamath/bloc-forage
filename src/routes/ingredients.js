const express = require("express");
const router = express.Router();
const ingredientController = require("../controllers/ingredientController");
const { check} = require('express-validator');


router.get("/ingredients", ingredientController.index);
router.get("/ingredients/new", ingredientController.new);
router.get("/ingredients/:id/edit", ingredientController.edit);

router.post("/ingredients/new", ingredientController.create);
router.post("/ingredients/:id/destroy", ingredientController.destroy);
router.post("/ingredients/:id/update", ingredientController.update);

module.exports = router;