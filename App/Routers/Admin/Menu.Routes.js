const { MenueController } = require("../../Http/Controller/Admin/Menu/Menu.Controller");
const { uploadFile } = require("../../Utills/Multer");
const router = require("express").Router();

router.post("/create", uploadFile("Menu").fields([{name: "icon"}]), MenueController.createMenu);
router.get("/list", MenueController.listOfMenu);

module.exports = {
  AdminApiMenuRotes: router
}