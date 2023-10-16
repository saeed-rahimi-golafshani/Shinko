const createHttpError = require("http-errors");
const { PermissionModel } = require("../../../../Models/Permission.Model");
const { 
  checkExistOfModelByTitleWithoutFile, 
  convertGregorianToPersionToday, 
  checkExistOfModelById,
  deleteInvalidPropertyObject,
  copyObject} = require("../../../../Utills/Public_Function");
const { createPermissionSchema } = require("../../../Validations/Admin/RBAC.Schema");
const Controller = require("../../Controller");
const { StatusCodes: httpStatus } = require("http-status-codes");
const permissionBlacList = {
  SLUG: "slug",
  CREATEAT: "createAt"
};
Object.freeze(permissionBlacList);

class PermissionController extends Controller{
  async createPermission(req, res, next){
    try {
      const requestBody = await createPermissionSchema.validateAsync(req.body);
      const { title, description, content } = requestBody;
      await checkExistOfModelByTitleWithoutFile(title, PermissionModel);
      const createAt = convertGregorianToPersionToday();
      const updateAt = convertGregorianToPersionToday();
      const slug = (description.split(" ").toString()).replace(/,/g, "_");
      const createResault = await PermissionModel.create({
        title,
        slug,
        description,
        active: false,
        createAt,
        updateAt,
        content
      });
      if(!createResault) throw new createHttpError.InternalServerError("خطای سروری");
      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        data: {
          message: "مجوز با موفقیت ثبت شد"
        }
      });
    } catch (error) {
      next(error)
    }
  };
  async listOfPermission(req, res, next){
    try {
      const permissions = await PermissionModel.find({}, {__v: 0});
      if(!permissions) throw new createHttpError.NotFound("نقشی یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          permissions
        }
      });
    } catch (error) {
      next(error)
    }
  };
  async listOfPermissionById(req, res, next){
    try {
      const { id } = req.params;
      const checkId = await checkExistOfModelById(id, PermissionModel);
      const permission = await PermissionModel.findOne({_id: checkId._id}, {__v: 0});
      if(!permission) throw new createHttpError.NotFound("نقش یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          permission
        }
      });
    } catch (error) {
      next(error)
    }
  };
  async listOfPermissionActive(req, res, next){
    try {
      const permission = await PermissionModel.find({active: true});
      if(!permission) throw new createHttpError.NotFound("مجوز فعالی یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          permission
        }
      });
    } catch (error) {
      next(error)
    }
  };
  async listOfPermissionNotActive(req, res, next){
    try {
      const permission = await PermissionModel.find({active: false});
      if(!permission) throw new createHttpError.NotFound("مجوز غیر فعالی یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          permission
        }
      });
    } catch (error) {
      next(error)
    }
  };
  async updatePermission(req, res, next){
    try {
      const { id } = req.params;
      const checkId = await checkExistOfModelById(id, PermissionModel);
      const requestData = copyObject(req.body);
      const blackFeildList = Object.values(permissionBlacList)
      deleteInvalidPropertyObject(requestData, blackFeildList);
      let slug;
      if(requestData.description){
        slug = (requestData.description.split(" ").toString()).replace(/,/g, "_");
      }
      const updateAt = convertGregorianToPersionToday();
      const updateResault = await PermissionModel.updateOne({_id: checkId._id}, {$set: requestData, slug, updateAt});
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
}

module.exports = {
  PermissionController: new PermissionController()
}