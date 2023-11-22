const createHttpError = require("http-errors");
const { CoupenModel } = require("../../../../Models/Coupen.Model");
const { createCoupenSchema } = require("../../../Validations/Admin/Coupen.Schema");
const Controller = require("../../Controller");
const { convertGregorianDateToPersionDateToToday } = require("../../../../Utills/Public_Function");
const { StatusCodes: httpStatus } = require("http-status-codes")

class CoupenController extends Controller{
  async crateCoupen(req, res, next){
    try {
      const requestBody = await createCoupenSchema.validateAsync(req.body);
      const {
        coupen_code, 
        title,
        percent_discount,
        max_discount_amount,
        min_shoppingcart_amount,
        product_category_Id,
        product_Id,
        user_Id,
        start_date,
        end_date,
        total,
        number_uses_user,
        first_order
      } = requestBody;
      const checkCoupen = await CoupenModel.findOne({coupen_code});
      if(checkCoupen) throw new createHttpError.BadRequest("این کد تخفیف از قبل ثبت شده است، لطفا کد دیگری را انتخاب کنید");
      const createTime = convertGregorianDateToPersionDateToToday().replace(/-/g, "/");
      const updateTime = convertGregorianDateToPersionDateToToday().replace(/-/g, "/");
      let discount;
      if(percent_discount >= 0  && percent_discount <= 100){
        discount = requestBody.percent_discount;
      } else {
        throw new createHttpError.BadRequest("مقدار درصد تخفیف را بین 0 تا 100 قرار دهید")
      };
      console.log(discount);
      const createResault = await CoupenModel.create({
        coupen_code,
        title,
        percent_discount: discount,
        max_discount_amount,
        min_shoppingcart_amount,
        product_category_Id,
        product_Id,
        user_Id,
        start_date,
        end_date,
        total,
        number_uses_user,
        first_order,
        createdAt: createTime,
        updatedAt: updateTime
      });
      if(!createResault) throw new createHttpError.InternalServerError("خطای سروری");
      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        data: {
          message: "کد تخفیف با موفقیت ثبت شد"
        }
      });
    } catch (error) {
      next(error)
    }
  };
  async listOfCoupen(req, res, next){
    try {
      const { startDate, endDate, statusCoupen } = req.query;
      let coupens;
      if(startDate){
        coupens = await CoupenModel.find({start_date: startDate});
      } else if(endDate){
        coupens = await CoupenModel.find({end_date: endDate})
      } else if(statusCoupen){
        coupens = await CoupenModel.find({status: statusCoupen});
      } else if(startDate && endDate){
        coupens = await CoupenModel.find({start_date: startDate, end_date: endDate});
      } else if(startDate && statusCoupen){
        coupens = await CoupenModel.find({start_date: startDate, status: statusCoupen});
      } else if(endDate && statusCoupen){
        coupens = await CoupenModel.find({end_date: endDate, status: statusCoupen})
      } else{
        throw new createHttpError.NotFound("نتیجه ای یافت نشد")
      }
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          coupens
        }
      });
    } catch (error) {
      next(error)
    }
  }
}

module.exports = {
  CoupenController: new CoupenController()
}