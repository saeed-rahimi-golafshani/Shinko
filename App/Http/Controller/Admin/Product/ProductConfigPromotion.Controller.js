const createHttpError = require("http-errors");
const { ProductModel } = require("../../../../Models/Product.Model");
const { ProductConfigPromotionModel } = require("../../../../Models/Product_Config_Promotion.Model");
const { VariationOptionModel } = require("../../../../Models/Variation_Option.Model");
const { 
  checkExistOfModelById, 
  discountOFPrice, 
  copyObject, 
  deleteInvalidPropertyObjectWithOutBlackList,
  convertPersionToGregorianStartDate,
  convertPersionToGregorianEndDate,
  convertGregorianToPersionToday, 
} = require("../../../../Utills/Public_Function");
const { crateProductConfigPromotionSchema } = require("../../../Validations/Admin/Product.Schema");
const Controller = require("../../Controller");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { OfferNameModel } = require("../../../../Models/OfferName.Model");
const moment = require("jalali-moment");
const momentMJ = require("moment-jalali");

class ProductConfigPromotionController extends Controller{
  async createProductConfigPromotion(req, res, next){
    try {
      const requestBody = await crateProductConfigPromotionSchema.validateAsync(req.body);
      const { product_Id, variation_option_Id, offerName_Id, stock, main_price, discount, description, start_date, end_date } = requestBody;
      const product = await checkExistOfModelById(product_Id, ProductModel);
      const variationoption = await checkExistOfModelById(variation_option_Id, VariationOptionModel);
      const checkProductConfigPromotion = await ProductConfigPromotionModel.findOne({product_Id: product._id, variation_option_Id: variationoption._id});
      if(checkProductConfigPromotion) throw new createHttpError.BadRequest("گزینه مورد نظر از قبل ثبت شده است، لطفا گزینه های دیگر را انتخاب نمایید");
      const price = discountOFPrice(main_price, discount);
      const createResault = await ProductConfigPromotionModel.create(
        {
          product_Id,
          variation_option_Id,
          offerName_Id,
          stock,
          main_price,
          discount,
          price,
          start_date: convertPersionToGregorianStartDate(start_date),
          end_date: convertPersionToGregorianEndDate(end_date),
          description
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
  async offerOfProductConfigPromotionByDate(req, res, next){
    try {
      const today = convertGregorianToPersionToday();
      const productConfigPromotion = await ProductConfigPromotionModel.find({
        $and: [
          {
            start_date: {
              $lte: today
            }
          },
          {
            end_date: {
              $gte: today
            }
          }
        ]
      });
      if(!productConfigPromotion) throw new createHttpError.NotFound("پیشنهاد شگفت انگیزی یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          productConfigPromotion
        }
      })
    } catch (error) {
      next(error)
    }
  }
  async listOfProductConfigPromotion(req, res, next){
    try {
      const productConfigPromotion = await ProductConfigPromotionModel.findOne({}, {__v: 0, createdAt: 0, updatedAt: 0}).lean().populate([
        {path: "product_Id", select: {title: 1}},
        {path: "variation_option_Id", populate: {path: "variation_Id", model: "variation", select: {name: 1}}, select: {value: 1}},
        {path: "offerName_Id", select: {name: 1}},
      ]);
      if(!productConfigPromotion) throw new createHttpError.NotFound("گزینه ای یافت نشد");
  
      console.log(productConfigPromotion.stock);
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          productConfigPromotion
        }
      });
    } catch (error) {
      next(error)
    }
  };
  async listOfProductConfigPromotionById(req, res, next){
    try {
      const { id } = req.params;
      const checkId = await checkExistOfModelById(id, ProductConfigPromotionModel);
      const productConfigPromotion = await ProductConfigPromotionModel.find({_id: checkId._id}, {__v: 0, createdAt: 0, updatedAt: 0}).lean().populate([
        {path: "product_Id", select: {title: 1}},
        {path: "variation_option_Id", populate: {path: "variation_Id", model: "variation", select: {name: 1}}, select: {value: 1}},
        {path: "offerName_Id", select: {name: 1}},
      ]);
      if(!productConfigPromotion) throw new createHttpError.NotFound("گزینه ای یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          productConfigPromotion
        }
      });
    } catch (error) {
      next(error)
    }
  };
  async listOfProductConfigPromotionByOfferNameId(req, res, next){
    try {
      const { offerId } = req.params;
      const checkId = await checkExistOfModelById(offerId, OfferNameModel);
      const productConfigPromotion = await ProductConfigPromotionModel.find({offerName_Id: checkId._id}, {__v: 0, createdAt: 0, updatedAt: 0}).lean().populate([
        {path: "product_Id", select: {title: 1}},
        {path: "variation_option_Id", populate: {path: "variation_Id", model: "variation", select: {name: 1}}, select: {value: 1}},
        {path: "offerName_Id", select: {name: 1}},
      ]);
      if(!productConfigPromotion) throw new createHttpError.NotFound("گزینه ای یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          productConfigPromotion
        }
      });
    } catch (error) {
      next(error)
    }
  };
  async updateProductConfigPromotion(req, res, next){
    try {
      const { id } = req.params;
      const checkId = await checkExistOfModelById(id, ProductConfigPromotionModel);
      const requestData = copyObject(req.body);
      deleteInvalidPropertyObjectWithOutBlackList(requestData);
      let price;
      if(requestData.main_price && requestData.discount){
        price = discountOFPrice(requestData.main_price, requestData.discount);
      } else if(requestData.discount){
        price = discountOFPrice(checkId.main_price, requestData.discount);
      } else if(requestData.main_price){
        price = discountOFPrice(requestData.main_price, checkId.discount);
      }
      if(requestData.start_date ||  requestData.end_date){
        requestData.start_date = convertPersionToGregorianStartDate(requestData.start_date);
        requestData.end_date = convertPersionToGregorianEndDate(requestData.end_date);
      }
      const updateResault = await ProductConfigPromotionModel.updateOne({_id: checkId._id}, {$set: requestData, price});
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
  ProductConfigPromotionController: new ProductConfigPromotionController()
}