const { OfferNameController } = require("../../Http/Controller/Admin/Product/OfferName.Controller");
const { uploadFile } = require("../../Utills/Multer");
const router = require("express").Router();

router.post("/create", uploadFile("OfferName").fields([{name: "icon"}]), OfferNameController.createOfferName);

module.exports = {
  AdminApiOfferNameRoutes: router
}