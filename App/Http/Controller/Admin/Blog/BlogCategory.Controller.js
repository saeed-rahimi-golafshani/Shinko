const createHttpError = require("http-errors");
const { BlogCategoryModel } = require("../../../../Models/Blog_Category.Model");
const { createBlogCategorySchema } = require("../../../Validations/Admin/Blog.Schema");
const Controller = require("../../Controller");
const path = require("path");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { deleteFileInPath } = require("../../../../Utills/Public_Function");
const { default: mongoose } = require("mongoose");

class BlogCategoryController extends Controller{
    async createBlogCategory(req, res, next){
        try {
            const requestBody = await createBlogCategorySchema.validateAsync(req.body);
            const { title, en_title, showInArchive, priority, parent_Category } = requestBody;
            await this.checkBlogCategoryWithTitle(title);
            req.body.icon = path.join(requestBody.fileUploadPath, requestBody.filename).replace(/\\/g, "/");
            const icon = req.body.icon;
            const createResault = await BlogCategoryModel.create({title, en_title, parent_Category, icon, showInArchive, priority});
            if(!createResault){
                deleteFileInPath(req.body.icon);
                throw new createHttpError.InternalServerError("خطای سروری")
            } 
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
                    message: "مقاله با موفقیت ثبت گردید"
                }
            });

        } catch (error) {
            deleteFileInPath(req.body.icon)
            next(error)
        }
    };
    async listOfBlogCategory(req, res, next){
        try {
            const blogCategories = await BlogCategoryModel.find({parent_Category: undefined});
            if(!blogCategories) throw new createHttpError.NotFound("دسته بندی بلاگی یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    blogCategories
                }
            });
        } catch (error) {
            next(error)
        }
    };
    async listOfBlogCategoryById(req, res, next){
        try {
            const { id } = req.params;
            const checkId = await this.checkBlogCategoryWithId(id);
            const blogCategory = await BlogCategoryModel.findOne({_id: checkId.id});
            if(!blogCategory) throw new createHttpError.NotFound("دسته بندی مقاله ای یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    blogCategory
                }
            })
        } catch (error) {
            next(error)
        }
    };
    async checkBlogCategoryWithTitle(title){
        const blogCategory = await BlogCategoryModel.findOne({title});
        if(blogCategory) throw new createHttpError.BadRequest("عنوان دسته بندی از قبل ثبت شده است، لطفا عنوان دیگری رار انتخاب کنید");
        return blogCategory
    };
    async checkBlogCategoryWithId(id){
        if(!mongoose.isValidObjectId(id)) throw new createHttpError.BadRequest("ساختار شناسه مورد نظر اشتباه است");
        const blogCategory = await BlogCategoryModel.findById(id);
        if(!blogCategory) throw new createHttpError.NotFound("دسته بندی مقاله ای یافت نشد");
        return blogCategory
    };
};

module.exports = {
    BlogCategoryController: new BlogCategoryController()
}