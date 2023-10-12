const joi = require("joi");
const { FILENMAE_ICON_PATTERN } = require("../../../Utills/Constants");
const createHttpError = require("http-errors");

const createMenuSchema = joi.object({
  title: joi.string().trim().min(3).max(30).error(createHttpError.BadRequest("ساختار عنوان منو اشتباه است")),
  en_title: joi.string().trim().min(3).max(30).error(createHttpError.BadRequest("ساختار عنوان انگلیسی منو اشتباه است")),
  description: joi.string().trim().error(createHttpError.BadRequest("ساختار توضیحات منو اشتباه است")),
  link: joi.string().trim().error(createHttpError.BadRequest("ساختار پیوند یا لینک اشتباه است")),
  target: joi.string().trim().error(createHttpError.BadRequest("ساختار نوع منو اشتباه است")),
  filename: joi.string().pattern(FILENMAE_ICON_PATTERN).error(createHttpError.BadRequest("ساختار فرمت آیکون منو اشتباه است")),
  fileUploadPath: joi.allow()
});

module.exports = {
  createMenuSchema
}