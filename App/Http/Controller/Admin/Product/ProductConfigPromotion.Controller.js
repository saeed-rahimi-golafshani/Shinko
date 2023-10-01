const createHttpError = require("http-errors");
const { ProductModel } = require("../../../../Models/Product.Model");
const { ProductConfigPromotionModel } = require("../../../../Models/Product_Config_Promotion.Model");
const { VariationOptionModel } = require("../../../../Models/Variation_Option.Model");
const { checkExistOfModelById, discountOFPrice, getTime } = require("../../../../Utills/Public_Function");
const { crateProductConfigPromotionSchema } = require("../../../Validations/Admin/Product.Schema");
const Controller = require("../../Controller");
const { StatusCodes: httpStatus } = require("http-status-codes")

class ProductConfigPromotionController extends Controller{
  async createProductConfigPromotion(req, res, next){
    try {
      const requestBody = await crateProductConfigPromotionSchema.validateAsync(req.body);
      const { product_Id, variation_option_Id, stock, main_price, discount, end_date, name, description } = requestBody;
      const product = await checkExistOfModelById(product_Id, ProductModel);
      const variationoption = await checkExistOfModelById(variation_option_Id, VariationOptionModel);
      const checkProductConfigPromotion = await ProductConfigPromotionModel.findOne({product_Id: product._id, variation_option_Id: variationoption._id});
      if(checkProductConfigPromotion) throw new createHttpError.BadRequest("گزینه مورد نظر از قبل ثبت شده است، لطفا گزینه های دیگر را انتخاب نمایید");
      const price = discountOFPrice(main_price, discount);

      const start_date = Date.now();
      const endTime = (start_date + (end_date * 60 * 60 * 1000)); 
      const converttime = getTime(endTime);

      const createResault = await ProductConfigPromotionModel.create(
        {
          product_Id,
          variation_option_Id,
          stock,
          main_price,
          discount,
          price,
          start_date,
          end_date: converttime,
          name,
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
};

module.exports = {
  ProductConfigPromotionController: new ProductConfigPromotionController()
}