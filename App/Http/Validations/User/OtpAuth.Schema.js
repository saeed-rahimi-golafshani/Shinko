const joi = require("joi");
const { MOBILE_PATTERN } = require("../../../Utills/Constants");
const createHttpError = require("http-errors");

const otpRegisterSchema = joi.object({
    mobile: joi.string().trim().length(11).pattern(MOBILE_PATTERN).error(createHttpError.BadRequest("ساختار موبایل وارد شده اشتباه است"))
});
const otpLoginSchema = joi.object({
    mobile: joi.string().trim().length(11).pattern(MOBILE_PATTERN).error(createHttpError.BadRequest("ساختار موبایل وارد شده اشتباه است")),
    code: joi.string().trim().min(4).max(6).error(createHttpError.BadRequest("ساختار کد تایید اشتباه است"))
});

module.exports = {
    otpRegisterSchema,
    otpLoginSchema    
}