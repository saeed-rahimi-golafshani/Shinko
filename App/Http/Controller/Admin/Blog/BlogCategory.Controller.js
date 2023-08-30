const createHttpError = require("http-errors");
const { BlogCategoryModel } = require("../../../../Models/Blog_Category.Model");
const { createBlogCategorySchema } = require("../../../Validations/Admin/Blog.Schema");
const Controller = require("../../Controller");
const path = require("path");
const fs = require("fs");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { deleteFileInPath, copyObject, deleteInvalidPropertyObjectWithOutBlackList } = require("../../../../Utills/Public_Function");
const { default: mongoose } = require("mongoose");

class BlogCategoryController extends Controller{
    async createBlogCategory(req, res, next){
        try {
            const requestBody = await createBlogCategorySchema.validateAsync(req.body);
            const { title, en_title, showInArchive, priority, parent_Category } = requestBody;
            if(req.body.fileUploadPath && req.body.filename){
                req.body.icon = path.join(requestBody.fileUploadPath, requestBody.filename).replace(/\\/g, "/");
            }
            const checkBlogByTitle = await this.checkBlogCategoryWithTitle(title);
            if(!checkBlogByTitle){
                deleteFileInPath(req.body.icon);
            }
            const icon = req.body.icon;
            const createResault = await BlogCategoryModel.create({title, en_title, parent_Category, icon, showInArchive, priority});
            if(!createResault){
                deleteFileInPath(req.body.icon);
                throw new createHttpError.InternalServerError("خطای سروری")
            } 
            if(requestBody.parent_Category){
                const findBlogCategory = await BlogCategoryModel.findOne({_id:  requestBody.parent_Category});
                let count = findBlogCategory.count;
                let newCount = count + 1;
                count = newCount
                if(!findBlogCategory) throw new createHttpError.InternalServerError("خطای سروری");
                await BlogCategoryModel.updateOne({_id: findBlogCategory.id}, {count});
            }
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
                    message: "دسته بندی مقاله با موفقیت ثبت گردید"
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
    async listAllBlogCategory(req, res, next){
        const blogCategories = await BlogCategoryModel.find({});
        if(!blogCategories) throw new createHttpError.NotFound("دسته بندی مقاله ای یافت نشد");
        return res.status(httpStatus.OK).json({
            statusCode: httpStatus.OK,
            data:{
                blogCategories
            }
        });
    };
    async updateBlogCategory(req, res, next){
        try {
            const { id } = req.params; 
            const blogCategory = await this.checkBlogCategoryWithId(id);
            const DataBody = copyObject(req.body);
            if(DataBody.fileUploadPath && DataBody.filename){
                deleteFileInPath(blogCategory.icon);
                DataBody.icon = path.join(DataBody.fileUploadPath, DataBody.filename).replace(/\\/g, "/");                
            };
            deleteInvalidPropertyObjectWithOutBlackList(DataBody);
            if(DataBody.parent_Category){
                const subtractBlogCategory = await BlogCategoryModel.findOne({_id: blogCategory.parent_Category});
                const sumBlogCategory = await BlogCategoryModel.findOne({_id:  DataBody.parent_Category});
                if(!subtractBlogCategory) throw new createHttpError.NotFound("دسته بندی مقاله ای یافت نشد");
                let subCount = subtractBlogCategory.count;
                let SubtractCount = subCount - 1;
                subCount = SubtractCount;
                await BlogCategoryModel.updateOne({_id: subtractBlogCategory.id}, {count: subCount});
                let sumCount = sumBlogCategory.count;
                let newCount = sumCount + 1;
                sumCount = newCount;
                await BlogCategoryModel.updateOne({_id: sumBlogCategory.id}, {count: sumCount});
            }
            const updateResault = await BlogCategoryModel.updateOne({_id: blogCategory.id}, {$set: DataBody});
            if(updateResault.modifiedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "به روز رسانی با موفقیت انجام شد"
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