const createHttpError = require("http-errors");
const { ProductModel } = require("../../../../Models/Product.Model");
const { ProductConfigAdvancedModel } = require("../../../../Models/Product_Config_Advanced.Model");
const { VariationOptionModel } = require("../../../../Models/Variation_Option.Model");
const { checkExistOfModelById, discountOFPrice, copyObject, deleteInvalidPropertyObject, deleteInvalidPropertyObjectWithOutBlackList } = require("../../../../Utills/Public_Function");
const { crateProductConfigAdvanceSchema } = require("../../../Validations/Admin/Product.Schema");
const Controller = require("../../Controller");
const { StatusCodes: httpStatus } = require("http-status-codes");
// const productConfigAdvanceBlackList = {
//   PRICE: "price",
// }
// Object.freeze(productConfigAdvanceBlackList);

class ProductConfigAdvanceController extends Controller{
  async crateProductConfigAdvance(req, res, next){
    try {
      const requestBody = await crateProductConfigAdvanceSchema.validateAsync(req.body);
      const { product_Id, variation_option_Id, stock, main_price , discount } = requestBody;
      const product = await checkExistOfModelById(product_Id, ProductModel);
      const variationOption = await checkExistOfModelById(variation_option_Id, VariationOptionModel);
      const checkProductConfigAdvance = await ProductConfigAdvancedModel.findOne({product_Id: product._id, variation_option_Id: variationOption._id});
      if(checkProductConfigAdvance) throw new createHttpError.BadRequest("گزینه مورد نظر از قبل ثبت شده است، لطفا گزینه های دیگر را انتخاب نمایید");
      const price = discountOFPrice(main_price, discount);
      const createResault = await ProductConfigAdvancedModel.create(
        {
          product_Id, 
          variation_option_Id, 
          stock, 
          main_price, 
          discount, 
          price
        }
      );
      if(!createResault) throw new createHttpError.InternalServerError("خطای سروری");
      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        data: {
          message: "گزینه مورد نظر با موفقیت ثبت شد"
        }
      })
    } catch (error) {
      next(error)
    }
  };
  async listOfProductConfigAdvanceById(req, res, next){
    try {
      const { id } = req.params;
      const checkId = await checkExistOfModelById(id, ProductConfigAdvancedModel);
      const productConfigAdvance = await ProductConfigAdvancedModel.findOne({_id: checkId._id}, {__v: 0}).lean().populate([
        {path: "product_Id", select: {title: 1}},
        {path: "variation_option_Id", populate: {path: "variation_Id", model: "variation", select: {name: 1}}, select: {value: 1}}
      ]);
      if(!productConfigAdvance) throw new createHttpError.NotFound("گزینه مورد نظر یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          productConfigAdvance
        }
      });
    } catch (error) {
      next(error)
    }
  };
  async listOfProductConfigAdvanceByProductId(req, res, next){
    try {
      const { productId } = req.params;
      const checkId = await checkExistOfModelById(productId, ProductModel);
      const productConfigAdvance = await ProductConfigAdvancedModel.find({product_Id: checkId._id}, {__v: 0}).lean().populate([
        {path: "product_Id", select: {title: 1}},
        {path: "variation_option_Id", populate: {path: "variation_Id", select: {name: 1}}, select: {value: 1}}
      ]); 
      if(!productConfigAdvance) throw new createHttpError.NotFound("گزینه مورد نظر یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          productConfigAdvance
        }
      });
    } catch (error) {
      next(error)
    }
  };
  async updateProductConfigAdvance(req, res, next){
    try {
      const { id } = req.params;
      const checkId = await checkExistOfModelById(id, ProductConfigAdvancedModel);
      const requestData = copyObject(req.body);
      // let blackFeildList = Object.values(productConfigAdvanceBlackList)
      // deleteInvalidPropertyObject(requestData, blackFeildList);
      deleteInvalidPropertyObjectWithOutBlackList(requestData);
      let price;
      if(requestData.main_price && requestData.discount){
        price = discountOFPrice(requestData.main_price, requestData.discount);
      } else if(requestData.discount){
        price = discountOFPrice(checkId.main_price, requestData.discount);
      } else if(requestData.main_price){
        price = discountOFPrice(requestData.main_price, checkId.discount);
      } 
      const updateResault = await ProductConfigAdvancedModel.updateOne({_id: checkId._id}, {$set: requestData, price});
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
  async deleteProductConfigAdvance(req, res, next){
    try {
      const { id } = req.params;
      const checkId = await checkExistOfModelById(id, ProductConfigAdvancedModel);
      const deleteResault = await ProductConfigAdvancedModel.deleteOne({_id: checkId._id});
      if(deleteResault.deletedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          message: "گزینه مورد نظر با موفقیت حذف گردید"
        }
      });
    } catch (error) {
      next(error)
    }
  };
}

module.exports = {
  ProductConfigAdvanceController: new ProductConfigAdvanceController()
}





