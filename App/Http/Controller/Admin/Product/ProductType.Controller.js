const createHttpError = require("http-errors");
const { ProductTypeModel } = require("../../../../Models/Product_Type.Model");
const { createProductTypeSchema } = require("../../../Validations/Admin/Product.Schema");
const Controller = require("../../Controller");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { checkExistOfModelById, copyObject, deleteInvalidPropertyObjectWithOutBlackList } = require("../../../../Utills/Public_Function");

class ProductTypeController extends Controller{
  async createProductType(req, res, next){
    try {
      const requestBody = await createProductTypeSchema.validateAsync(req.body);
      const { type_name } = requestBody;
      const typeName = await ProductTypeModel.create({type_name});
      if(!typeName) throw new createHttpError.InternalServerError("خطای سروری");
      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        data:{
          message: "نوع محصول با موفقیت ثبت شد"
        }
      });
    } catch (error) {
      next(error)
    }
  };
  async listOfProductType(req, res, next){
    try {
      const prodcutTypes = await ProductTypeModel.find({});
      if(!prodcutTypes) throw new createHttpError.NotFound("نوع محصول یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          prodcutTypes
        }
      })
    } catch (error) {
      next(error)
    }
  };
  async listOfProductById(req, res, next){
    try {
      const { id } = req.params;
      const checkId = await checkExistOfModelById(id, ProductTypeModel);
      const productType = await ProductTypeModel.findOne({_id: checkId._id});
      if(!productType) throw new createHttpError.NotFound("نوع محصول یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          productType
        }
      })
    } catch (error) {
      next(error)
    }
  };
  async updateOfProductType(req, res, next){
    try {
      const { id } = req.params;
      const productType = await checkExistOfModelById(id, ProductTypeModel);
      const dataBody = copyObject(req.body);
      deleteInvalidPropertyObjectWithOutBlackList(dataBody);
      const updateResault = await ProductTypeModel.updateOne({_id: productType.id}, {$set: dataBody});
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
  async deleteOfProductType(req, res, next){
    try {
      const { id } = req.params;
      const productType = await checkExistOfModelById(id, ProductTypeModel);
      const deleteResault = await ProductTypeModel.deleteOne({_id: productType._id});
      if(deleteResault.deletedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          message: "نوع محصول با موفقیت حذف گردید"
        }
      })
    } catch (error) {
      next(error)
    }
  };
}

module.exports = {
  ProductTypeController: new ProductTypeController()
}