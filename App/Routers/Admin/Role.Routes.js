const { RoleController } = require("../../Http/Controller/Admin/RBAC/Role.Controller");
const router = require("express").Router();

router.post("/create", RoleController.createRole);
router.get("/list", RoleController.listOfRole);
router.get("/active", RoleController.listOfRoleByActive);
router.get("/not_active", RoleController.listOfRoleByNotActive);
router.get("/:id", RoleController.listOfRoleById);
router.patch("/update/:id", RoleController.updateRole);

module.exports = {
  AdminApiRoleRoutes: router
}