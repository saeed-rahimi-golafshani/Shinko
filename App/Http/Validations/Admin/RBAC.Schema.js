const createHttpError = require("http-errors");
const joi = require("joi");
const { MONGOID_PATTERN } = require("../../../Utills/Constants");

const createRoleSchema = joi.object({
  title: joi.string().trim().min(3).max(100).error(createHttpError.BadRequest("ساختار عنوان نقش اشتباه است")),
  description: joi.string().error(createHttpError.BadRequest("ساختار توضیحات برای ذکر نقش اشتباه است")),
  // active: joi.boolean().error(createHttpError.BadRequest("ساختار گزینه مورد نظر اشتباه است")),
  content: joi.string().trim().min(3).max(100).error(createHttpError.BadRequest("ساختار جزئیات کامل در مورد نقش اشتباه است")),
});
const createPermissionSchema = joi.object({
  title: joi.string().trim().min(3).max(100).error(createHttpError.BadRequest("ساختار عنوان مجوز اشتباه است")),
  description: joi.string().error(createHttpError.BadRequest("ساختار توضیحات برای ذکر مجوز اشتباه است")),
  content: joi.string().trim().min(3).max(100).error(createHttpError.BadRequest("ساختار جزئیات کامل در مورد مجوز اشتباه است")),
});
const createRolPermissionSchema = joi.object({
  role_Id: joi.string().trim().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار شناسه گزینه مورد نظر اشتباه است")),
  permission_Id: joi.string().trim().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار شناسه گزینه مورد نظر اشتباه است")),

})

module.exports = {
  createRoleSchema,
  createPermissionSchema,
  createRolPermissionSchema
}