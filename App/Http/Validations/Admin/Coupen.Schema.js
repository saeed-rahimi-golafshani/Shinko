const createHttpError = require("http-errors");
const joi = require("joi");
const { MONGOID_PATTERN } = require("../../../Utills/Constants");

const createCoupenSchema = joi.object({
  coupen_code: joi.string().trim().min(3).max(15).error(createHttpError.BadRequest("ساختار کد تخفیف اشتباه است")),
  title: joi.string().trim().error(createHttpError.BadRequest("ساختار عنوان کد تخفیف اشتباه است")),
  percent_discount: joi.number().error(createHttpError.BadRequest("ساختار درصد کد تخفیف اشتباه است")),
  max_discount_amount: joi.number().error(createHttpError.BadRequest("ساختار حداکثر مبلغ تخفیف اشتباه است")),
  min_shoppingcart_amount: joi.string().trim().error(createHttpError.BadRequest("ساختار حداقل مبلغ سبد خرید اشتباه است")),
  product_category_Id: joi.string().trim().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار دسته بندی محصول برای تخفیف اشتباه است")),
  product_Id: joi.string().trim().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار نام محصول برای تخفیف اشتباه است")),
  user_Id: joi.string().trim().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار نام کاربری برای تخفیف اشتباه است")),
  start_date: joi.string().trim().error(createHttpError.BadRequest(" ساختار شروع زمان تخفیف صحیح نمیباشد")),
  end_date: joi.string().trim().error(createHttpError.BadRequest(" ساختار پایان زمان تخفیف صحیح نمیباشد")),
  total: joi.number().error(createHttpError.BadRequest("ساختار تعداد کل کد تخفیف اشتباه است")),
  number_uses_user: joi.number().error(createHttpError.BadRequest("ساختار تعداد استفاده هر کاربر از کد تخفیف اشتباه است")),
  first_order: joi.boolean().error(createHttpError.BadRequest("ساختار تخفیف برای اولین سفارش اشتباه است")) 
});

module.exports = {
  createCoupenSchema
}