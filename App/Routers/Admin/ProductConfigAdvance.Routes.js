const { ProductConfigAdvanceController } = require("../../Http/Controller/Admin/Product/ProductConfigAdvanced.Controller");
const router = require("express").Router();

router.post("/create", ProductConfigAdvanceController.crateProductConfigAdvance);
router.get("/list/:id", ProductConfigAdvanceController.listOfProductConfigAdvanceById);
router.get("/list_product/:productId", ProductConfigAdvanceController.listOfProductConfigAdvanceByProductId);
router.patch("/update/:id", ProductConfigAdvanceController.updateProductConfigAdvance);
router.delete("/delete/:id", ProductConfigAdvanceController.deleteProductConfigAdvance);

module.exports = {
  AdminApiProductConfigAdvanceRoutes: router
}