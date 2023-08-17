const joi = require("joi");
const { MOBILE_PATTERN } = require("../../../Utills/Constants");
const createHttpError = require("http-errors");

const otpRegisterSchema = joi.object({
    mobile: joi.string().trim().length(11).pattern(MOBILE_PATTERN).error(createHttpError.BadRequest("ساختار موبایل وارد شده اشتباه است"))
});

module.exports = {
    otpRegisterSchema
}