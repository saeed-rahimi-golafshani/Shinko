const { VariationController } = require("../../Http/Controller/Admin/Product/Variation.Controller");

const router = require("express").Router();

router.post("/create", VariationController.createVariation);
router.get("/list/:id", VariationController.listOfVariationById);
router.get("/list_product_categort/:proCatId", VariationController.listOfVarationByProductCategoryId);
router.patch("/update/:id", VariationController.updateVariation);
router.delete("/delete/:id", VariationController.deleteVariation);
module.exports = {
  AdminApiVariationRoutes: router
}