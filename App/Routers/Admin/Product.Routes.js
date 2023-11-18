
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
router.get("/list_of_active", ProductController.listOfProductByActive);
router.get("/list_of_not_active", ProductController.listOfProductByNotActive);
router.patch("/update/:id", uploadFile("Products").fields([{name: "image"}]),
  stringToArray("tags"), ProductController.updateProduct);
router.patch("/update_gallery/:id", uploadFile("Products").fields([{name: "images", maxCount: 10}]), ProductController.updateProductByGallery);

router.delete("/remove/:id", ProductController.deleteProduct);

module.exports = {
  AdminApiProductRoutes: router
}  