const createHttpError = require("http-errors");
const { RoleModel } = require("../../../../Models/Role.Model");
const { 
  checkExistOfModelByTitleWithoutFile, 
  convertGregorianToPersionToday, 
  checkExistOfModelById,
  copyObject,
  deleteInvalidPropertyObject} = require("../../../../Utills/Public_Function");
const { createRoleSchema } = require("../../../Validations/Admin/RBAC.Schema");
const Controller = require("../../Controller");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { ROLES } = require("../../../../Utills/Constants");
const roletBlackList = {
  SLUG: "slug",
  CREATEAT: "createAt"
}
Object.freeze(roletBlackList);

class RoleController extends Controller{
  async createRole(req, res, next){
    try {
      const requestBody = await createRoleSchema.validateAsync(req.body);
      const { title, description, content } = requestBody;
      await checkExistOfModelByTitleWithoutFile(title, RoleModel);
      let createAt, updateAt, slug, createResault;
      if(title == ROLES.BUYERS || title == ROLES.ADMIN){
        createAt = convertGregorianToPersionToday();
        updateAt = convertGregorianToPersionToday();
        slug = (description.split(" ").toString()).replace(/,/g, "_");
        createResault = await RoleModel.create(
          {
            title, 
            description, 
            active: true, 
            content, 
            slug, 
            createAt, 
            updateAt
          }, 
          {
            __v: 0
          });
      } else {
        createAt = convertGregorianToPersionToday();
        updateAt = convertGregorianToPersionToday();
        slug = (description.split(" ").toString()).replace(/,/g, "_");
        createResault = await RoleModel.create(
          {
            title, 
            description, 
            active: false, 
            content, 
            slug, 
            createAt, 
            updateAt
          }, 
          {
            __v: 0
          });
      }
      
      if(!createResault) throw new createHttpError.InternalServerError("خطای سروری");
      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        data: { 
          message: "نقش مورد نظر با موفقیت ثبت شد"
        }
      });
    } catch (error) {
      next(error)
    }
  };
  async listOfRole(req, res, next){
    try {
      const roles = await RoleModel.find({});
      if(!roles) throw new createHttpError.NotFound("نقشی یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          roles
        }
      });

    } catch (error) {
      next(error)
    }
  };
  async listOfRoleById(req, res, next){
    try {
      const { id } = req.params;
      const checkId = await checkExistOfModelById(id, RoleModel);
      const role = await RoleModel.findOne({_id: checkId._id});
      if(!role) throw new createHttpError.NotFound("نقش یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          role
        }
      });
    } catch (error) {
      next(error)
    }
  };
  async listOfRoleByActive(req, res, next){
    try {
      const roles = await RoleModel.find({active: true});
      if(!roles) throw new createHttpError.NotFound("نقش فعالی یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          roles
        }
      });
    } catch (error) {
      next(error)
    }
  }
  async listOfRoleByNotActive(req, res, next){
    try {
      const roles = await RoleModel.find({active: false});
      if(!roles) throw new createHttpError.NotFound("نقش غیر فعالی یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          roles
        }
      });
    } catch (error) {
      next(error)
    }
  };
  async updateRole(req, res, next){
   try {
    let slug;
    const { id } = req.params;
    const checkId = await checkExistOfModelById(id, RoleModel);
    const requestData = copyObject(req.body); 
    let blackFeildList = Object.values(roletBlackList);
    deleteInvalidPropertyObject(requestData, blackFeildList);
    if(requestData.title){
      if(requestData.title == ROLES.BUYERS || requestData.title == ROLES.ADMIN){
        await RoleModel.updateOne({_id: checkId._id}, {active: true});
      } else {
        await RoleModel.updateOne({_id: checkId._id}, {active: false});
      }
    };
    if(requestData.description){
      slug = (requestData.description.split(" ").toString()).replace(/,/g, "_");
    };
    const updateAt = convertGregorianToPersionToday();
    const updateResault = await RoleModel.updateOne({_id: checkId._id}, {$set: requestData, slug, updateAt});
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
  };
}

module.exports = {
  RoleController: new RoleController()
}