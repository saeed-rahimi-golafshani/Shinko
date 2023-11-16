
const { ProductController } = require("../../Http/Controller/Admin/Product/Product.Controller");
const { stringToArray } = require("../../Http/Middleware/StringToArray");
const { uploadFile } = require("../../Utills/Multer");
const router = require("express").Router();

router.post("/create",
  uploadFile("Products").fields([{name: "image"}]), 
  stringToArray("tags"), ProductController.createProduct);
router.patch("/gallery/:id", uploadFile("Products").fields([{name: "images", maxCount: 10}]), ProductController.createProductGallery);

router.get("/list", ProductController.listOfProduct);
router.get("/list/:id", ProductController.listOfProductById);
router.get("/list_of_category", ProductController.listOfProductByCategory);
router.get("/list_of_protype/:productTypeId", ProductController.listOfProductByProductType);
router.get("/list_of_producer/:producer", ProductController.listOfProductByProducer);
router.get("/list_of_active", ProductController.listOfProductByActive);
router.get("/list_of_not_active", ProductController.listOfProductByNotActive);
router.patch("/update/:id", uploadFile("Products").fields([{name: "image", maxCount: 10}]), 
  stringToArray("tags"), ProductController.updateProduct);
router.delete("/remove/:id", ProductController.deleteProduct);

module.exports = {
  AdminApiProductRoutes: router
}  