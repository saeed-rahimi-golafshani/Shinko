const { UserController } = require("../../Http/Controller/Admin/User/User.Controller");
const router = require("express").Router();

router.post("/create", UserController.createUserAdmin)

module.exports = {
  AdminApiUserRoutes: router
}