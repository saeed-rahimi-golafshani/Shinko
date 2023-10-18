const { RolePermissionController } = require("../../Http/Controller/Admin/RBAC/Role_Permission.Controller");
const router = require("express").Router();

router.post("/create", RolePermissionController.createRolePermission);
router.get("/list", RolePermissionController.listOfRolePermission);
router.get("/:id", RolePermissionController.listOfRolePermissionById);
router.patch("/update/:id", RolePermissionController.updateRolePermission)

module.exports = {
  AdmonApiRolePermissionRoutes: router
};