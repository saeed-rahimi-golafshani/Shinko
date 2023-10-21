
const createHttpError = require("http-errors");
const { RoleModel } = require("../../Models/Role.Model");
const { RolePermissionModel } = require("../../Models/Role_Permission.Model");
const { PERMISSIONS } = require("../../Utills/Constants");
const { PermissionModel } = require("../../Models/Permission.Model");

function checkPermission(requiredPermission = []){
  return async function(req, res, next){
    try {
      const allPermissions = requiredPermission.flat(2);
      const user = req.user;
      const role = await RoleModel.findOne({_id: user.role_Id});
      const rolePermissions = await RolePermissionModel.find({role_Id: role._id});
      const id_permissions = rolePermissions.map(item => item.permission_Id);
      const permissions = await PermissionModel.find({_id: {$in: id_permissions}});
      const userPermission = permissions.map(item => item.title);
      const hasPermission = allPermissions.every(permission => {
        return userPermission.includes(permission)
      });
      if(userPermission.includes(PERMISSIONS.SUPER_ADMIN)) return next()
      if(allPermissions.length == 0 || hasPermission) return next()
      throw createHttpError.Forbidden("شما به این قسمت دسترسی ندارید")
    } catch (error) {
      next(error)
    }
  }
}

module.exports = {
    checkPermission
}