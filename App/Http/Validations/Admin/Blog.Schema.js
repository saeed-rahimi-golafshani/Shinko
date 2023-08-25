const createHttpError = require("http-errors");
const joi = require("joi");
const { MONGOID_PATTERN, FILENMAE_ICON_PATTERN } = require("../../../Utills/Constants");

const createBlogCategorySchema = joi.object({
    title: joi.string().trim().min(3).max(30).error(createHttpError.BadRequest("ساختار عنوان دسته بندی مقاله اشتباه است")),
    en_title: joi.string().trim().min(3).max(30).error(createHttpError.BadRequest("ساختار عنوان انگلیسی دسته بندی مقاله اشتباه است")),
    // count: joi.number().trim().error(createHttpError.BadRequest("ساختار تعداد دسته بندی شاشتباه است")),
    showInArchive: joi.boolean().error(createHttpError.BadRequest("ساختار گزینه مورد نظر اشتباه است")),
    priority: joi.string().trim().error(createHttpError.BadRequest("ساختار گزینه مورد نظر اشتباه است")),
    parent_Category: joi.string().trim().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار گزینه مورد نظر اشتباه است")),
    filename: joi.string().pattern(FILENMAE_ICON_PATTERN).error(createHttpError.BadRequest("ساختار فرمت آیکون مورد نظر اشتباه است")),
    fileUploadPath: joi.allow()
})

module.exports = {
    createBlogCategorySchema
}