const createHttpError = require("http-errors");
const { RolePermissionModel } = require("../../../../Models/Role_Permission.Model");
const { convertGregorianToPersionToday, checkExistOfModelById, copyObject, deleteInvalidPropertyObject } = require("../../../../Utills/Public_Function");
const { createRolPermissionSchema } = require("../../../Validations/Admin/RBAC.Schema");
const Controller = require("../../Controller");
const { StatusCodes: httpStatus } = require("http-status-codes");
const rolePermissionBlackList = {
  CREATEAT: "createAt",
  UPDATEAT: "updateAt"
}
Object.freeze(rolePermissionBlackList);
class RolePermissionController extends Controller{
  async createRolePermission(req, res, next){
    try {
      const requestBody = await createRolPermissionSchema.validateAsync(req.body);
      const { role_Id, permission_Id } = requestBody;
      const createAt = convertGregorianToPersionToday();
      const updateAt = convertGregorianToPersionToday();
      const createResault = await RolePermissionModel.create(
        {
          role_Id, 
          permission_Id, 
          createAt, 
          updateAt
        });
      if(!createResault) throw new createHttpError.InternalServerError("خطای سروری");
      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        data: {
          message: "مجوز برای نقش ها با موفقیت ثبت شد"
        }
      });
    } catch (error) {
      next(error)
    }
  };
  async listOfRolePermission(req, res, next){
    try {
      const rolePermissions = await RolePermissionModel.find({}).populate([
        {path: "role_Id", select: {title: 1, description: 1}},
        {path: "permission_Id", select: {title: 1, description: 1}}
      ]);
      if(!rolePermissions) throw new createHttpError.NotFound("مجوز نقشی یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          rolePermissions
        }
      }) 
    } catch (error) {
      next(error)
    }
  };
  async listOfRolePermissionById(req, res, next){
    try {
      const { id } = req.params;
      const checkId = await checkExistOfModelById(id, RolePermissionModel);
      const rolePermission = await RolePermissionModel.findOne({_id: checkId._id}).populate([
        {path: "role_Id", select: {title: 1, description: 1}},
        {path: "permission_Id", select: {title: 1, description: 1}}
      ]);
      if(!rolePermission) throw new createHttpError.NotFound("نقش یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          rolePermission
        }
      });
    } catch (error) {
      next(error)
    }
  };
  async updateRolePermission(req, res, next){
    try {
      const { id } = req.params;
      const checkId = await checkExistOfModelById(id, RolePermissionModel);
      const requestData = copyObject(req.body); 
      let blackFeildList = Object.values(rolePermissionBlackList);
      deleteInvalidPropertyObject(requestData, blackFeildList);
      const updateAt = convertGregorianToPersionToday();
      const updateResault = await RolePermissionModel.updateOne({_id: checkId._id}, {$set: requestData, updateAt});
      if(updateResault.modifiedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          message: "به روز رسانی با موفقیت انجام شد"
        }
      });
     } catch (error) {
      next(error)
     }
  }
};

module.exports = {
  RolePermissionController: new RolePermissionController()
}