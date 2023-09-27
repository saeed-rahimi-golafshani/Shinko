const { VariationOptionController } = require("../../Http/Controller/Admin/Product/VariationOption.Controller");
const { stringToArray } = require("../../Http/Middleware/StringToArray");
const router = require("express").Router();

router.post("/create", stringToArray("value"), VariationOptionController.createVariationOption);
router.get("/list/:id", VariationOptionController.listOfVariationOptionById)

module.exports = {
  AdminApiVariationOptionsRoutes: router
}