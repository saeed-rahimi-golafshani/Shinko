const { PermissionController } = require("../../Http/Controller/Admin/RBAC/Permission.Controller");
const router = require("express").Router();

router.post("/create", PermissionController.createPermission);
router.get("/list", PermissionController.listOfPermission);
router.get("/active", PermissionController.listOfPermissionActive);
router.get("/not_active", PermissionController.listOfPermissionNotActive);
router.get("/:id", PermissionController.listOfPermissionById);

module.exports = {
  AdminApiPermissionRoutes: router
}