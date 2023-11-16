const createHttpError = require("http-errors");
const { MONGOID_PATTERN, FILENMAE_ICON_PATTERN } = require("../../../Utills/Constants");
const joi = require("joi");

const createVariationSchema = joi.object({
  // product_category_Id: joi.string().trim().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار گزینه مورد نظر اشتباه است")),
  // name: joi.string().trim().min(2).max(30).error(createHttpError.BadRequest("ساختار نام مشخصات فنی اشتباه است"))
  title: joi.string().trim().min(2).max(30).error(createHttpError.BadRequest("ساختار عنوان جزئیات محصول اشتباه است")),
  en_title: joi.string().trim().min(2).max(30).error(createHttpError.BadRequest("ساختار عنوان انگلیسی جزئیات محصول اشتباه است")),
  show_in_archive: joi.boolean().error(createHttpError.BadRequest("ساختار گزینه مورد نظر اشتباه است")),
  show_in_up: joi.boolean().error(createHttpError.BadRequest("ساختار گزینه مورد نظر اشتباه است")),
  filename: joi.string().pattern(FILENMAE_ICON_PATTERN).error(createHttpError.BadRequest("ساختار فرمت آیکون مورد نظر اشتباه است")),
  fileUploadPath: joi.allow()
});
const createVariationOptionSchema = joi.object({
  title: joi.string().trim().error(createHttpError.BadRequest("ساختار مقدار جزئیات محصول اشتباه است"))
});
const createVariationCategorySchema = joi.object({
  product_category_id: joi.string().trim().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار گزینه مورد نظر اشتباه است")),
});

module.exports = {
  createVariationSchema,
  createVariationOptionSchema,
  createVariationCategorySchema
}