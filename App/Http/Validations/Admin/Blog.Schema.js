const createHttpError = require("http-errors");
const joi = require("joi");
const { MONGOID_PATTERN, FILENMAE_ICON_PATTERN, FILENMAE_IMAGE_PATTERN } = require("../../../Utills/Constants");

const createBlogCategorySchema = joi.object({
    title: joi.string().trim().min(3).max(50).error(createHttpError.BadRequest("ساختار عنوان دسته بندی مقاله اشتباه است")),
    en_title: joi.string().trim().min(3).max(50).error(createHttpError.BadRequest("ساختار عنوان انگلیسی دسته بندی مقاله اشتباه است")),
    // count: joi.number().trim().error(createHttpError.BadRequest("ساختار تعداد دسته بندی شاشتباه است")),
    showInArchive: joi.boolean().error(createHttpError.BadRequest("ساختار گزینه مورد نظر اشتباه است")),
    priority: joi.string().trim().error(createHttpError.BadRequest("ساختار گزینه مورد نظر اشتباه است")),
    parent_Category: joi.string().trim().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار گزینه مورد نظر اشتباه است")),
    filename: joi.string().pattern(FILENMAE_ICON_PATTERN).error(createHttpError.BadRequest("ساختار فرمت آیکون مورد نظر اشتباه است")),
    fileUploadPath: joi.allow()
});
const createBlogSchema = joi.object({
    blog_category_Id: joi.string().trim().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار گزینه مورد نظر اشتباه است")),
    title: joi.string().trim().min(3).max(100).error(createHttpError.BadRequest("ساختار عنوان مقاله اشتباه است")),
    en_title: joi.string().trim().min(3).max(100).error(createHttpError.BadRequest("ساختار عنوان انگلیسی مقاله اشتباه است")),
    short_text: joi.string().error(createHttpError.BadRequest("ساختار متن کوتاه مقاله اشتباه است")),
    text: joi.string().error(createHttpError.BadRequest("ساختار متن مقاله اشتباه است")),
    tags: joi.array().min(0).max(10).error(createHttpError.BadRequest("ساختار تگ یا برچسب اشتباه است")),
    reading_time: joi.string().error(createHttpError.BadRequest("ساختار مدت زمان مطالعه اشتباه است")),
    show: joi.boolean().error(createHttpError.BadRequest("ساختار گزینه مورد نظر اشتباه است")),
    filename: joi.string().pattern(FILENMAE_IMAGE_PATTERN).error(createHttpError.BadRequest("ساختار فرمت تصویر مورد نظر اشتباه است")),
    fileUploadPath: joi.allow()
});

module.exports = {
    createBlogCategorySchema,
    createBlogSchema
}