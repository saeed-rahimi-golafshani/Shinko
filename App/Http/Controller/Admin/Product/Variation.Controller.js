const Controller = require("../../Controller");
const { createVariationSchema } = require("../../../Validations/Admin/Variation.Schema");
const { checkExistOfModelById, copyObject, deleteInvalidPropertyObjectWithOutBlackList } = require("../../../../Utills/Public_Function");
const { VariationModel } = require("../../../../Models/Variation.Model");
const createHttpError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { default: mongoose } = require("mongoose");
const { ProductCategoryModel } = require("../../../../Models/Product_Category.Model");

class VariationController extends Controller{
  async createVariation(req, res, next){
    try {
      const requestBody = await createVariationSchema.validateAsync(req.body);
      const { product_category_Id, name } = requestBody;
      const checkTitle = await VariationModel.findOne({product_category_Id, name});
      if(checkTitle){
        throw new createHttpError.BadRequest("این عنوان از قبل ثبت شده است، لطفا عنوان دیگری را انتخاب کنید")
      }
      const variation = await VariationModel.create({product_category_Id, name});
      if(!variation) throw new createHttpError.InternalServerError("خطای سروری");
      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        data: {
          message: "عنوان مشخصات فنی با موفقیت ثبت گردید"
        }
      });

    } catch (error) {
      next(error)
    }
  };
  async listOfVariationById(req, res, next){
    try {
      const { id } = req.params;
      const checkId = await checkExistOfModelById(id, VariationModel);
      const variation = await VariationModel.findOne({_id: checkId._id});
      if(!variation) throw new createHttpError.NotFound("گزینه مورد نظر یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          variation
        }
      });
    } catch (error) {
      next(error)
    }
  };
  async listOfVarationByProductCategoryId(req, res, next){
    try {
      const { proCatId } = req.params;
      const checkId = await checkExistOfModelById(proCatId, ProductCategoryModel);
      const variations = await VariationModel.aggregate([
        {
          $match: {
            product_category_Id: checkId._id
          },
        },
        {
          $lookup: {
            from: "product_categories",
            localField: "product_category_Id",
            foreignField: "_id",
            as: "product_category_Id"
          }
        },
        {
          $unwind: "$product_category_Id"
        },
        {
          $project: {
            // "product_category_Id._id" : 0,
            "product_category_Id.count" : 0,
            "product_category_Id.icon" : 0,
            "product_category_Id.text" : 0,
            "product_category_Id.short_text" : 0,
            "product_category_Id.__v": 0,
            "product_category_Id.tags": 0,                  
            "product_category_Id.en_title": 0,                  
            "product_category_Id.showInArchive": 0,               
            "product_category_Id.priority": 0,                  
            "product_category_Id.parent_Category": 0,
            "product_category_Id.createdAt": 0,
            "product_category_Id.updatedAt": 0,
            "__v": 0
        }
        }
      ]);
      if(!variations) throw new createHttpError.NotFound("گزینه مورد نظر یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          variations
        }
      })
    } catch (error) {
      next(error)
    }
  };
  async updateVariation(req, res, next){
    try {
      const { id } = req.params;
      const checkId = await checkExistOfModelById(id, VariationModel);
      const requestData = copyObject(req.body);
      deleteInvalidPropertyObjectWithOutBlackList(requestData);
      const updateResault = await VariationModel.updateOne({_id: checkId._id}, {$set: requestData});
      if(updateResault.modifiedCount == 0) throw new createHttpError.InternalServerError("خططای سروری");
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
  async deleteVariation(req, res, next){
    try {
      const { id } = req.params;
      await checkExistOfModelById(id, VariationModel);
      const deleteResault = await VariationModel.deleteOne({_id: id});
      if(deleteResault.deletedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          message: "عنوان مشخصات فنی با موفقیت حذف شد"
        }
      });
    } catch (error) {
      next(error)
    }
  }
};

module.exports = {
  VariationController: new VariationController()
}