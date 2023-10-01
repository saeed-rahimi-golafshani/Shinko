const createHttpError = require("http-errors");
const { VariationOptionModel } = require("../../../../Models/Variation_Option.Model");
const { createVariationOptionSchema } = require("../../../Validations/Admin/Variation.Schema");
const Controller = require("../../Controller");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { checkExistOfModelById, copyObject, deleteInvalidPropertyObjectWithOutBlackList } = require("../../../../Utills/Public_Function");
const { VariationModel } = require("../../../../Models/Variation.Model");
const { ProductModel } = require("../../../../Models/Product.Model");
const { ProductConfigrationModel } = require("../../../../Models/Product_Configration.Model");
const { ProductConfigAdvancedModel } = require("../../../../Models/Product_Config_Advanced.Model");

class VariationOptionController extends Controller{
  async createVariationOption(req, res, next){
    try {
      const requestBody = await createVariationOptionSchema.validateAsync(req.body);
      const { variation_Id, value } = requestBody;
      const checkTitle = await VariationOptionModel.findOne({variation_Id, value});
      if(checkTitle){
        throw new createHttpError.BadRequest("این عنوان از قبل ثبت شده است، لطفا عنوان دیگری را انتخاب کنید")
      } 

      const variation = await VariationModel.findOne({_id: variation_Id});
      const product = await ProductModel.findOne({product_category_Id: variation.product_category_Id});
      if(!product) throw new createHttpError.NotFound("محصولی یافت نشد، لطفا محصولی ثبت نمایید");     

      const variationOption = await VariationOptionModel.create({variation_Id, value});
      if(!variationOption) throw new createHttpError.InternalServerError("خطای سروری");
      
      const createProductConfigration = await ProductConfigrationModel.create({product_Id: product._id, variation_option_Id: variationOption._id})
      if(!createProductConfigration) throw new createHttpError.InternalServerError("خطای سروری");

      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        data: {
          message: "مقدار مشخصات فنی با موفقیت ثبت شد"
        }
      });
    } catch (error) {
      next(error)
    }
  };
  async listOfVariationOptionById(req, res, next){
    try {
      const { id } = req.params;
      const checkId = await checkExistOfModelById(id, VariationOptionModel);
      const variationOption = await VariationOptionModel.aggregate([
        {
          $match: {_id: checkId._id}
        },
        {
          $lookup: {
            from: "variations",
            localField: "variation_Id",
            foreignField: "_id",
            as: "variation_Id"
          }
        },
        {
          $unwind: "$variation_Id"
        }, 
        {
          $project: {
            "variation_Id._id": 0,
            "variation_Id.product_category_Id": 0,
            "variation_Id.__v": 0,
            "__v": 0,
          }
        }
      ])

      if(!variationOption) throw new createHttpError.NotFound("گزینه مورد نظر یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          variationOption
        }
      });      
    } catch (error) {
      next(error)
    }
  };
  async updateVariationOption(req, res, next){
    try {
      const { id } = req.params;
      const checkId = await checkExistOfModelById(id, VariationOptionModel);
      const requestData = copyObject(req.body);
      deleteInvalidPropertyObjectWithOutBlackList(requestData);
      const updateResault = await VariationOptionModel.updateOne({_id: checkId._id}, {$set: requestData});
      if(updateResault.modifiedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          message: "مقدار مشخصات فنی با موفقیت به روز رسانی شد"
        }
      });
     } catch (error) {
      next(error)
    }
  };
  async deleteVariationOption(req, res, next){
    try {
      const { id } = req.params;
      const checkVariationoptionId = await checkExistOfModelById(id, VariationOptionModel);
      const deleteResault = await VariationOptionModel.deleteOne({_id: checkVariationoptionId._id});
      if(deleteResault.deletedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
      const deleteProConfigration = await ProductConfigrationModel.deleteOne({variation_option_Id: checkVariationoptionId._id});
      if(deleteProConfigration.deletedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
      // ----------------------------------
      const deleteProductConfigAdvance = await ProductConfigAdvancedModel.deleteMany({variation_option_Id: checkVariationoptionId._id});
      if(deleteProductConfigAdvance.deletedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          message: "مقدار مشخصات فنی با موفیقت حذف شد"
        }
      });
    } catch (error) {
      next(error)
    }
  };
  async listOfProductConfigrationByProId(req, res, next){
    try {
      const { productId } = req.params;
      const checkId = await checkExistOfModelById(productId, ProductModel);
      const productConfig = await ProductConfigrationModel.find({product_Id: checkId._id}, {__v: 0}) .lean().populate([
        {path: "product_Id", select: {title: 1}},
        {path: "variation_option_Id", populate: {path: "variation_Id", model: "variation", select: {name: 1}}, select: {value: 1}}
      ]);

      // const productConfig = await ProductConfigrationModel.aggregate([
      //   {
      //     $match: {
      //       product_Id: checkId._id
      //     }
      //   },
      //   {
      //     $lookup: {
      //       from: "products",
      //       localField: "product_Id",
      //       foreignField: "_id",
      //       as: "product_Id"
      //     }
      //   },
      //   {
      //     $lookup: {
      //       from: "variation_options",
      //       localField: "variation_option_Id",
      //       foreignField: "_id",
      //       as: "variation_option_Id"
      //     }
      //   }, 
      // ])

      if(!productConfig) throw new createHttpError.NotFound("گزینه مورد نظر یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          productConfig
        }
      });
    } catch (error) {
      next(error)
    }
  };

}

module.exports = {
  VariationOptionController: new VariationOptionController()
}