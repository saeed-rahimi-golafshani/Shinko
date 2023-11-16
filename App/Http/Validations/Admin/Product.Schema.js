const createHttpError = require("http-errors");
const joi = require("joi");
const { MONGOID_PATTERN, FILENMAE_ICON_PATTERN, FILENMAE_IMAGE_PATTERN } = require("../../../Utills/Constants");

const createProductCategorySchema = joi.object({
  title: joi.string().trim().min(3).max(100).error(createHttpError.BadRequest("ساختار عنوان دسته بندی محصول اشتباه است")),
  text: joi.string().error(createHttpError.BadRequest("ساختار متن محصول اشتباه است")),
  short_text: joi.string().error(createHttpError.BadRequest("ساختار متن کوتاه محصول اشتباه است")),
  tags: joi.array().min(0).max(10).error(createHttpError.BadRequest("ساختار تگ یا برچسب اشتباه است")),
  en_title: joi.string().trim().min(3).max(100).error(createHttpError.BadRequest("ساختار عنوان انگلیسی دسته بندی محصول اشتباه است")),
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
  en_title: joi.string().trim().min(3).max(100).error(createHttpError.BadRequest("ساختار عنوان انگلیسی محصول اشتباه است")),
  product_category_Id: joi.string().trim().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار گزینه مورد نظر اشتباه است")),
  brand_Id: joi.string().trim().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار گزینه مورد نظر اشتباه است")),
  main_price: joi.number().error(createHttpError.BadRequest(" ساختار قیمت اصلی وارد شده صحیح نمیباشد")),
  discount: joi.number().error(createHttpError.BadRequest(" ساختار تخفیف وارد شده صحیح نمیباشد")),
  preparation_time: joi.number().error(createHttpError.BadRequest(" ساختار زمان آماده سازی محصول صحیح نمیباشد")),
  short_text: joi.string().error(createHttpError.BadRequest("ساختار متن کوتاه محصول اشتباه است")),
  text: joi.string().error(createHttpError.BadRequest("ساختار متن محصول اشتباه است")),
  tags: joi.array().min(0).max(10).error(createHttpError.BadRequest("ساختار تگ یا برچسب اشتباه است")),
  returnable: joi.boolean().error(createHttpError.BadRequest("ساختار مرجوعی محصول اشتباه است")),
  publication_date: joi.string().trim().min(3).max(30).error(createHttpError.BadRequest("ساختار زمان انتشار محصول اشتباه است")),
  publication_status: joi.string().trim().min(3).max(30).error(createHttpError.BadRequest("ساختار وضعیت انتشار محصول اشتباه است")),
  stock: joi.number().error(createHttpError.BadRequest(" ساختار تعداد محصول صحیح نمیباشد")),
  filename: joi.string().pattern(FILENMAE_IMAGE_PATTERN).error(createHttpError.BadRequest("ساختار فرمت آیکون مورد نظر اشتباه است")),
  fileUploadPath: joi.allow()
});
const crateProductConfigAdvanceSchema = joi.object({
  product_Id: joi.string().trim().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار شناسه محصول اشتباه است")),
  variation_option_Id: joi.string().trim().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار شناسه گزینه مورد نظر اشتباه است")),
  stock: joi.number().error(createHttpError.BadRequest(" ساختار تعداد محصول صحیح نمیباشد")),
  main_price: joi.number().error(createHttpError.BadRequest(" ساختار قیمت اصلی وارد شده صحیح نمیباشد")),
  discount: joi.number().error(createHttpError.BadRequest(" ساختار تخفیف وارد شده صحیح نمیباشد")),
});
const crateProductConfigPromotionSchema = joi.object({
  product_Id: joi.string().trim().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار شناسه محصول اشتباه است")),
  variation_option_Id: joi.string().trim().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار شناسه گزینه مورد نظر اشتباه است")),
  offerName_Id: joi.string().trim().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار شناسه گزینه مورد نظر اشتباه است")),
  stock: joi.number().error(createHttpError.BadRequest(" ساختار تعداد محصول صحیح نمیباشد")),
  main_price: joi.number().error(createHttpError.BadRequest(" ساختار قیمت اصلی وارد شده صحیح نمیباشد")),
  discount: joi.number().error(createHttpError.BadRequest(" ساختار تخفیف وارد شده صحیح نمیباشد")),
  description: joi.string().trim().error(createHttpError.BadRequest("ساختار توضیحات تخفیف اشتباه است")),
  start_date: joi.string().trim().error(createHttpError.BadRequest(" ساختار شروع زمان تخفیف صحیح نمیباشد")),
  end_date: joi.string().trim().error(createHttpError.BadRequest(" ساختار پایان زمان تخفیف صحیح نمیباشد"))
});
const crateOfferNameSchema = joi.object({
  name: joi.string().trim().error(createHttpError.BadRequest("ساختار نام تخفیف اشتباه است")),
  en_title: joi.string().trim().min(3).max(30).error(createHttpError.BadRequest("ساختار عنوان انگلیسی تخفیف اشتباه است")),
  filename: joi.string().pattern(FILENMAE_ICON_PATTERN).error(createHttpError.BadRequest("ساختار فرمت آیکون مورد نظر اشتباه است")),
  fileUploadPath: joi.allow()
});
const createBrandSchema = joi.object({
  title: joi.string().trim().min(3).max(30).error(createHttpError.BadRequest("ساختار عنوان برند اشتباه است")),
  en_title: joi.string().trim().min(3).max(30).error(createHttpError.BadRequest("ساختار عنوان انگلیسی برند اشتباه است")),
  description: joi.string().trim().error(createHttpError.BadRequest("ساختار توضیحات برند اشتباه است")),
  tags: joi.array().min(0).max(10).error(createHttpError.BadRequest("برچسب ها بیشتر از 10 آیتم نمیتواند باشد")),
  show: joi.boolean().error(createHttpError.BadRequest("ساختار گزینه مورد نظر اشتباه است")),
  filename: joi.string().pattern(FILENMAE_ICON_PATTERN).error(createHttpError.BadRequest("ساختار فرمت آیکون مورد نظر اشتباه است")),
  fileUploadPath: joi.allow()
});

module.exports = {
  createProductCategorySchema,
  createProductTypeSchema,
  createProductSchema,
  crateProductConfigAdvanceSchema,
  crateProductConfigPromotionSchema,
  crateOfferNameSchema,
  createBrandSchema
}