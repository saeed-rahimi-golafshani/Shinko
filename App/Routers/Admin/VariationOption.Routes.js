const { VariationOptionController } = require("../../Http/Controller/Admin/Product/VariationOption.Controller");
const { stringToArray } = require("../../Http/Middleware/StringToArray");
const router = require("express").Router();

router.post("/create/:variationId", VariationOptionController.createVariationOption);
router.get("/list/:id", VariationOptionController.listOfVariationOptionByVariationId);
router.get("/product_configration/:productId", VariationOptionController.listOfProductConfigrationByProId)
router.patch("/update/:id", stringToArray("value"), VariationOptionController.updateVariationOption);
router.delete("/delete/:id", VariationOptionController.deleteVariationOption);

module.exports = {
  AdminApiVariationOptionsRoutes: router
}