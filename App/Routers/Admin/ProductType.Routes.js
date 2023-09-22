const { ProductTypeController } = require("../../Http/Controller/Admin/Product/ProductType.Controller");
const router = require("express").Router();

router.post("/create", ProductTypeController.createProductType);
router.get("/list", ProductTypeController.listOfProductType);
router.get("/list/:id", ProductTypeController.listOfProductById);
router.patch("/update/:id", ProductTypeController.updateOfProductType);
router.delete("/remove/:id", ProductTypeController.deleteOfProductType);

module.exports = {
  AdminApiProductTypeRoutes: router
}