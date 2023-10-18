const createHttpError = require("http-errors");
const joi = require("joi");
const { MONGOID_PATTERN } = require("../../../Utills/Constants");

const createCourseStatusSchema = joi.object({
  title: joi.string().trim().min(3).max(30).error(createHttpError.BadRequest("ساختار وضعیت دوره اشتباه است")) 
});
const createCourseTypeSchema = joi.object({
  title: joi.string().trim().min(3).max(30).error(createHttpError.BadRequest("ساختار نوع دوره اشتباه است")) 
});
const createCourseSchema = joi.object({
  product_Id: joi.string().trim().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار گزینه مورد نظر اشتباه است")),
  courseType_Id: joi.string().trim().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار گزینه مورد نظر اشتباه است")),
  courseStatus_Id: joi.string().trim().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار گزینه مورد نظر اشتباه است")),
  teacher: joi.string().trim().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار گزینه مورد نظر اشتباه است")),

})

module.exports = {
  createCourseStatusSchema,
  createCourseTypeSchema,
  createCourseSchema
}