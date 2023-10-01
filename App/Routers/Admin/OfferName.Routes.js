const { OfferNameController } = require("../../Http/Controller/Admin/Product/OfferName.Controller");
const { uploadFile } = require("../../Utills/Multer");
const router = require("express").Router();

router.post("/create", uploadFile("OfferName").fields([{name: "icon"}]), OfferNameController.createOfferName);
router.get("/list", OfferNameController.listOfferName);
router.get("/:id", OfferNameController.listOfferNameById);
router.patch("/update/:id", uploadFile("OfferName").fields([{name: "icon"}]), OfferNameController.updateOfferName);

module.exports = {
  AdminApiOfferNameRoutes: router
}