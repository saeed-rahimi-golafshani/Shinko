const createHttpError = require("http-errors");
const { VariationCategoryModel } = require("../../../../Models/Variation_category");
const { createVariationCategorySchema } = require("../../../Validations/Admin/Variation.Schema");
const Controller = require("../../Controller");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { checkExistOfModelById } = require("../../../../Utills/Public_Function");
const { VariationModel } = require("../../../../Models/Variation.Model");

class VariationCategoryController extends Controller{
  async createVariationCategory(req, res, next){
    try {
      const { variationId }  = req.params;
      const requestBody = await createVariationCategorySchema.validateAsync(req.body);
      const { product_category_id } = requestBody;
      const createResault = await VariationCategoryModel.create({product_category_id, variation_id: variationId});
      if(!createResault) throw new createHttpError.InternalServerError("خطای سروری");
      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        data: {
          message: "دسته بندی اضافه شد"
        }
      })
    } catch (error) {
      next(error)
    }
  };
  async listOfVarationByProductCategoryId(req, res, next){
    try {
      const { proCatId } = req.query;
      const checkId = await checkExistOfModelById(proCatId, ProductCategoryModel);
      const variations = await VariationCategoryModel.find({product_category_id: checkId._id}, {product_category_id: 0, __v: 0}).populate([
        {path: "variation_id", select: {title: 1}}
      ]);
      const numberOfResault = await VariationCategoryModel.find({product_category_id: checkId._id}).count();
      if(!variations) throw new createHttpError.NotFound("گزینه مورد نظر یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          variations,
          numberOfResault
        }
      });
    } catch (error) {
      next(error)
    }
  };
  async listOfCategoryByVariation(req, res, next){
    try {
      const { variId } = req.params;
      const checkId = await checkExistOfModelById(variId, VariationModel);
      // const variationCategory = await VariationCategoryModel.find({variation_id: checkId._id}, {__v: 0, variation_id: 0}).populate([
      //   {path: "product_category_id", select: {title: 1}}
      // ]);
      const variationCategory = await VariationCategoryModel.aggregate([
        {
          $match: {variation_id: checkId._id}
        },
        {
          $lookup: {
            from: "product_categories",
            localField: "product_category_id",
            foreignField: "_id",
            as: "product_category_id"
          }
        },
        {
          $unwind: "$product_category_id"
        },
        {
          $project: {
            __v: 0,
            variation_id: 0,
            "product_category_id.count": 0,
            "product_category_id.icon": 0,
            "product_category_id.text": 0,
            "product_category_id.short_text": 0,
            "product_category_id.tags": 0,
            "product_category_id.en_title": 0,
            "product_category_id.showInArchive": 0,
            "product_category_id.priority": 0,
            "product_category_id.parent_Category": 0,
            "product_category_id.createdAt": 0,
            "product_category_id.updatedAt": 0,
          }
        }
      ])
      const numberOfResault = await VariationCategoryModel.find({variation_id: checkId._id}).count();
      if(!variationCategory) throw new createHttpError.NotFound("گزینه مورد نظر یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          variationCategory,
          numberOfResault
        }
      })
    } catch (error) {
      next(error)
    }
  };
  async deleteVariationCategory(req, res, next){
    try {
      const { id } = req.params;
      const checkId = await checkExistOfModelById(id, VariationCategoryModel);
      const deleteResault = await VariationCategoryModel.deleteOne({_id: checkId._id});
      if(deleteResault.deletedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          message: "گزینه مورد نظر با موفقیت حذف شد"
        }
      }); 
    } catch (error) {
      next(error)
    }
  }
}

module.exports = {
  VariationCategoryController: new VariationCategoryController()
}