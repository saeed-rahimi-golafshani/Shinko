const createHttpError = require("http-errors");
const { MONGOID_PATTERN } = require("../../../Utills/Constants");
const joi = require("joi");

const createVariationSchema = joi.object({
  product_category_Id: joi.string().trim().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار گزینه مورد نظر اشتباه است")),
  name: joi.string().trim().min(2).max(30).error(createHttpError.BadRequest("ساختار نام مشخصات فنی اشتباه است"))
});
const createVariationOptionSchema = joi.object({
  variation_Id: joi.string().trim().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار گزینه مورد نظر اشتباه است")),
  value: joi.array().min(1).max(30).error(createHttpError.BadRequest("ساختار مقدار مشخصات فنی اشتباه است"))
});

module.exports = {
  createVariationSchema,
  createVariationOptionSchema
}