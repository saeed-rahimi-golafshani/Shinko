const createHttpError = require("http-errors");
const Joi = require("joi");
const { MOBILE_PATTERN, EMAIL_PATTERN } = require("../../../Utills/Constants");

const registerSchema = Joi.object({
    firstname: Joi.string().trim().error(createHttpError.BadRequest("ساختار نام برای ثبت نام اشتباه است")),
    lastname: Joi.string().trim().error(createHttpError.BadRequest("ساختار نام خانوادگی برای ثبت نام اشتباه است")),
    mobile: Joi.string().length(11).pattern(MOBILE_PATTERN).trim().error(createHttpError.BadRequest("ساختار شماره تلفن همراه اشتباه است")),
    email: Joi.string().trim().pattern(EMAIL_PATTERN).error(createHttpError.BadRequest("ساختار ایمیل وارد شده اشتباه است")),
    password: Joi.string().trim().min(6).max(16).error(createHttpError.BadRequest("ساختار رمز عبور اشتباه است"))
});
const loginSchema = Joi.object({
    mobile: Joi.string().trim().length(11).pattern(MOBILE_PATTERN).error(createHttpError.BadRequest("ساختار شماره تلفن همراه اشتباه است")),
    password: Joi.string().trim().min(6).max(16).error(createHttpError.BadRequest("ساختار رمز عبور اشتباه است"))
})



module.exports = {
    registerSchema,
    loginSchema
}