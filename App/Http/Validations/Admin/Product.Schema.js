const createHttpError = require("http-errors");
const joi = require("joi");
const { MONGOID_PATTERN, FILENMAE_ICON_PATTERN } = require("../../../Utills/Constants");

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

module.exports = {
  createProductCategorySchema
}