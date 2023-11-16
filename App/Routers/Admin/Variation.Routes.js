const { VariationController } = require("../../Http/Controller/Admin/Product/Variation.Controller");
const { uploadFile } = require("../../Utills/Multer");

const router = require("express").Router();

router.post("/create", uploadFile("Variation").fields([{name: "icon"}]),VariationController.createVariation);
router.get("/", VariationController.listOfVariation);
router.get("/list/:id", VariationController.listOfVariationById);
router.patch("/update/:id", VariationController.updateVariation);
router.delete("/delete/:id", VariationController.deleteVariation);
module.exports = {
  AdminApiVariationRoutes: router
}