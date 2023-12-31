const { BrandConteroller } = require("../../Http/Controller/Admin/Product/BrandController");
const { stringToArray } = require("../../Http/Middleware/StringToArray");
const { uploadFile } = require("../../Utills/Multer");
const router = require("express").Router();

router.post("/create", stringToArray("tags"), uploadFile("Brand").fields([{name: "icon"}]), BrandConteroller.createBrand);
router.get("/list", BrandConteroller.listOfBrand);
router.get("/list_of_brand/:id", BrandConteroller.listofBrandById);
router.get("/list_of_active", BrandConteroller.listOfBrandByActive);
router.get("/list_of_unactive", BrandConteroller.listOfBrandByUnActive);
router.patch("/update/:id", stringToArray("tags"), uploadFile("Brand").fields([{name: "icon"}]), BrandConteroller.updateOfBrand);
router.get("/:brandId", BrandConteroller.listOfProductByBrand);
router.get("/count/:brandId", BrandConteroller.listOfProductByBrandOfCount);
router.get("/category/:brandProCatId", BrandConteroller.listOfProductByBrandOfProCat);
router.get("/category_count/:brandProCatId", BrandConteroller.listOfProductByBrandProCatOfCount);


module.exports = {
  AdminApiBrandRoutes: router
}