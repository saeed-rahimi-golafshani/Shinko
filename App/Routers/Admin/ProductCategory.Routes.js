const { ProductCategoryController } = require("../../Http/Controller/Admin/Product/ProductCategory.Controller");
const { stringToArray } = require("../../Http/Middleware/StringToArray");
const { uploadFile } = require("../../Utills/Multer");
const router = require("express").Router();

router.post("/create", stringToArray("tags"), uploadFile("ProductCategory").fields([{name: "icon"}]), ProductCategoryController.createProductCategory);
router.get("/list", ProductCategoryController.listOfProductCategory);
router.get("/list/:id", ProductCategoryController.listOfProductCategoryById); 
router.get("/list-all", ProductCategoryController.listOfAllProductCategory);
router.patch("/update/:id", 
 stringToArray("tags"), 
 uploadFile("ProductCategory").fields([{name: "icon"}]), 
 ProductCategoryController.updateProductCategory);
router.delete("/remove/:id", ProductCategoryController.removeProductCategory);

module.exports = {
  AdminApiProductCategoryRoutes: router
}