const createHttpError = require("http-errors");
const joi = require("joi");

const createCourseStatusSchema = joi.object({
  title: joi.string().trim().min(3).max(30).error(createHttpError.BadRequest("ساختار وضعیت دوره اشتباه است")) 
});
const createCourseTypeSchema = joi.object({
  title: joi.string().trim().min(3).max(30).error(createHttpError.BadRequest("ساختار نوع دوره اشتباه است")) 
});

module.exports = {
  createCourseStatusSchema,
  createCourseTypeSchema
}