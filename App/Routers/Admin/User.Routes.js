const { UserController } = require("../../Http/Controller/Admin/User/User.Controller");
const router = require("express").Router();

router.post("/create", UserController.createUserAdmin);
router.get("/list", UserController.listOfUser);
router.get("/list_status", UserController.listOfUserByStatus);
router.get("/list_gender", UserController.listOfUserByGender);
router.get("/:id", UserController.listOfUserById);

module.exports = {
  AdminApiUserRoutes: router
}