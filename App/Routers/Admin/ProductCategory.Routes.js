const { ProductCategoryController } = require("../../Http/Controller/Admin/Product/ProductCategory.Controller");
const { stringToArray } = require("../../Http/Middleware/StringToArray");
const { uploadFile } = require("../../Utills/Multer");
const router = require("express").Router();

router.post("/create", uploadFile("ProductCategory").fields([{name: "icon"}]), ProductCategoryController.createProductCategory);
router.get("/list", ProductCategoryController.listOfProductCategory);
router.get("/list/:id", ProductCategoryController.listOfProductCategoryById); 
router.get("/list-all", ProductCategoryController.listOfAllProductCategory);
router.patch("/update/:id", 
uploadFile("ProductCategory").fields([{name: "icon"}]), 
stringToArray("tags"), 
ProductCategoryController.updateProductCategory);
router.delete("/remove/:id", ProductCategoryController.removeProductCategory);

module.exports = {
  AdminApiProductCategoryRoutes: router
}