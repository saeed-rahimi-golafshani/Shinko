const createHttpError = require("http-errors");
const { BlogCategoryModel } = require("../../../../Models/Blog_Category.Model");
const { createBlogCategorySchema } = require("../../../Validations/Admin/Blog.Schema");
const Controller = require("../../Controller");
const path = require("path");
const { StatusCodes: httpStatus } = require("http-status-codes");

class BlogCategoryController extends Controller{
    async createBlogCategory(req, res, next){
        try {
            const requestBody = await createBlogCategorySchema.validateAsync(req.body);
            const { title, en_title, showInArchive, priority, parent_Category } = requestBody;
            await this.checkBlogCategoryWithTitle(title);
            req.body.icon = path.join(requestBody.fileUploadPath, requestBody.filename).replace(/\\/g, "/");
            const icon = req.body.icon;
            const createResault = await BlogCategoryModel.create({title, en_title, parent_Category, icon, showInArchive, priority});
            if(!createResault) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
                    message: "مقاله با موفقیت ثبت گردید"
                }
            });

        } catch (error) {
            next(error)
        }
    }
    async checkBlogCategoryWithTitle(title){
        const blogCategory = await BlogCategoryModel.findOne({title});
        if(blogCategory) throw new createHttpError.BadRequest("عنوان دسته بندی از قبل ثبت شده است، لطفا عنوان دیگری رار انتخاب کنید");
        return blogCategory
    }
};

module.exports = {
    BlogCategoryController: new BlogCategoryController()
}