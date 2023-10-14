const { MenueController } = require("../../Http/Controller/Admin/Menu/Menu.Controller");
const { uploadFile } = require("../../Utills/Multer");
const router = require("express").Router();

router.post("/create", uploadFile("Menu").fields([{name: "icon"}]), MenueController.createMenu);
router.get("/list", MenueController.listOfMenu);
router.get("/list_Of_menu/:id", MenueController.listOfMenuById);
router.patch("/update/:id", uploadFile("Menu").fields([{name: "icon"}]), MenueController.updateMenu);
router.delete("/remove/:id", MenueController.removeMenu);

module.exports = {
  AdminApiMenuRotes: router
}