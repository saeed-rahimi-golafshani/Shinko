const { VariationCategoryController } = require("../../Http/Controller/Admin/Product/Variation_Category.Controller");
const router = require("express").Router();

router.post("/create/:variationId", VariationCategoryController.createVariationCategory);
router.get("/list_product_categort", VariationCategoryController.listOfVarationByProductCategoryId);
router.get("/list_of_category/:variId", VariationCategoryController.listOfCategoryByVariation);
router.delete("/delete/:id", VariationCategoryController.deleteVariationCategory);

module.exports = {
  AdminApiVariationCategoryRoutes: router
}