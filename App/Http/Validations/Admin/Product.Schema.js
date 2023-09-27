const createHttpError = require("http-errors");
const joi = require("joi");
const { MONGOID_PATTERN, FILENMAE_ICON_PATTERN, FILENMAE_IMAGE_PATTERN } = require("../../../Utills/Constants");

const createProductCategorySchema = joi.object({
  title: joi.string().trim().min(3).max(30).error(createHttpError.BadRequest("ساختار عنوان دسته بندی محصول اشتباه است")),
  text: joi.string().error(createHttpError.BadRequest("ساختار متن محصول اشتباه است")),
  short_text: joi.string().error(createHttpError.BadRequest("ساختار متن کوتاه محصول اشتباه است")),
  tags: joi.array().min(0).max(10).error(createHttpError.BadRequest("ساختار تگ یا برچسب اشتباه است")),
  en_title: joi.string().trim().min(3).max(30).error(createHttpError.BadRequest("ساختار عنوان انگلیسی دسته بندی محصول اشتباه است")),
  showInArchive: joi.boolean().error(createHttpError.BadRequest("ساختار گزینه مورد نظر اشتباه است")),
  priority: joi.string().trim().error(createHttpError.BadRequest("ساختار گزینه مورد نظر اشتباه است")),
  parent_Category: joi.string().trim().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار گزینه مورد نظر اشتباه است")),
  filename: joi.string().pattern(FILENMAE_ICON_PATTERN).error(createHttpError.BadRequest("ساختار فرمت آیکون مورد نظر اشتباه است")),
  fileUploadPath: joi.allow()
});
const createProductTypeSchema = joi.object({
  type_name: joi.string().trim().min(3).max(30).error(createHttpError.BadRequest("ساختار نوع محصول اشتباه است"))
});
const createProductSchema = joi.object({
  title: joi.string().trim().min(3).max(100).error(createHttpError.BadRequest("ساختار عنوان محصول اشتباه است")),
  en_title: joi.string().trim().min(3).max(50).error(createHttpError.BadRequest("ساختار عنوان انگلیسی محصول اشتباه است")),
  text: joi.string().error(createHttpError.BadRequest("ساختار متن محصول اشتباه است")),
  short_text: joi.string().error(createHttpError.BadRequest("ساختار متن کوتاه محصول اشتباه است")),
  tags: joi.array().min(0).max(10).error(createHttpError.BadRequest("ساختار تگ یا برچسب اشتباه است")),
  product_category_Id: joi.string().trim().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار گزینه مورد نظر اشتباه است")),
  Product_Type_Id: joi.string().trim().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار گزینه مورد نظر اشتباه است")),
  // file_Id: joi.string().trim().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار گزینه مورد نظر اشتباه است")),
  producer: joi.string().trim().min(3).max(30).error(createHttpError.BadRequest("ساختار تولید کننده محصول اشتباه است")),
  status: joi.string().trim().min(3).max(30).error(createHttpError.BadRequest("ساختار وضعیت محصول اشتباه است")),
  stock: joi.number().error(createHttpError.BadRequest(" ساختار تعداد محصول صحیح نمیباشد")),
  active: joi.boolean().error(createHttpError.BadRequest("ساختار گزینه مورد نظر اشتباه است")),
  main_price: joi.number().error(createHttpError.BadRequest(" ساختار قیمت اصلی وارد شده صحیح نمیباشد")),
  discount: joi.number().error(createHttpError.BadRequest(" ساختار تخفیف وارد شده صحیح نمیباشد")),
  send_date: joi.string().trim().min(3).max(30).error(createHttpError.BadRequest("ساختار تاریخ ارسال محصول اشتباه است")),
  returned: joi.boolean().error(createHttpError.BadRequest("ساختار گزینه مورد نظر اشتباه است")),
  filename: joi.string().pattern(FILENMAE_IMAGE_PATTERN).error(createHttpError.BadRequest("ساختار فرمت آیکون مورد نظر اشتباه است")),
  fileUploadPath: joi.allow()
});

module.exports = {
  createProductCategorySchema,
  createProductTypeSchema,
  createProductSchema
}