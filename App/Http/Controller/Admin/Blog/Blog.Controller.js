const createHttpError = require("http-errors");
const { BlogModel } = require("../../../../Models/Blog.Model");
const { createBlogSchema } = require("../../../Validations/Admin/Blog.Schema");
const Controller = require("../../Controller");
const { listOfImageFromRequest, getFileOrginalname, getFileEncoding, getFileMimetype, getFileSize, getFileFilename, checkExistOfModelById } = require("../../../../Utills/Public_Function");
const path = require("path");
const { FileModel } = require("../../../../Models/Files.Model");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { BlogCategoryModel } = require("../../../../Models/Blog_Category.Model");
const { default: mongoose } = require("mongoose");
const { UserModel } = require("../../../../Models/User.Model");


class BlogController extends Controller{
    async createBlog(req, res, next){
        try {
            const requestBody = await createBlogSchema.validateAsync(req.body);
            const { blog_category_Id, title, en_title, short_text, text, tags, reading_time } = requestBody;
            await this.checkBlogWithTitle(title);
            const author = req.user._id;
            const blog = await BlogModel.create({
                blog_category_Id, 
                title, 
                en_title, 
                short_text, 
                text, tags, 
                reading_time, 
                author
            });
            if(!blog) throw new createHttpError.InternalServerError("خطای سروری");

            // --------- craete file model ------------------
            const type_files = listOfImageFromRequest(req.files.images || [], requestBody.fileUploadPath);
            const type = "blog";
            // const type_Id = blog._id;
            const orginalName = getFileOrginalname(req.files['images']);
            const fileEncoding = getFileEncoding(req.files['images']);
            const mimeType = getFileMimetype(req.files['images']);
            const fileName = getFileFilename(req.files['images']);
            const fileSize = getFileSize(req.files['images']);
            const fileDetailes = await FileModel.create({
                files: type_files, 
                type,
                originalnames: orginalName,
                encoding: fileEncoding,
                mimetype: mimeType,
                filename: fileName,
                size: fileSize
            });
            if(!fileDetailes) throw new createHttpError.InternalServerError("خطای سروری")

            // ---------- ---------------------------------
            const fileId = fileDetailes._id;
            await BlogModel.updateOne({_id: blog._id}, {file_Id: fileId});

            // ----------------- add count to category ------------------------------
            const blogCategory = await BlogCategoryModel.findOne({_id: blog.blog_category_Id});
            if(!blogCategory) throw new createHttpError.InternalServerError("خطای سروری");
            let count = blogCategory.count;
            let newCount = count + 1;
            count = newCount
            await BlogCategoryModel.updateOne({_id: blogCategory.id}, {count});
            // ----------- response -------------------------------------
            
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
                    message: "مقاله با موفقیت ثبت شد"
                }
            })

        } catch (error) {
            next(error)
        }
    };
    async listOfBlog(req, res, next){
        try {
            const list_of_blog = await BlogModel.find({}).populate([
                {path: "file_Id", select: {files: 1}}
            ]);
            if(!list_of_blog) throw new createHttpError.NotFound("بلاگی یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    list_of_blog
                }
            });
        } catch (error) {
            next(error);
        }
    };
    async listOfBlogById(req, res, next){
        try {
            const { id } = req.params;
            const blog = await checkExistOfModelById(id, BlogModel);
            const listOfblog = await BlogModel.findOne({_id: blog._id}).populate([
                {path: "file_Id", select: {files: 1}}
            ]);
            if(!listOfblog) throw new createHttpError.NotFound("بلاگی یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    listOfblog
                }
            });

        } catch (error) {
            next(error)
        }
    };
    async listOfBlogByAuthor(req, res, next){
        try {
            const { authorId } = req.params;
            const author = await checkExistOfModelById(authorId, UserModel);
            const listOfBlog = await BlogModel.find({author: author._id}).populate([
                {path: "file_Id", select: {files: 1}}
            ]);
            if(!listOfBlog) throw new createHttpError.NotFound("بلاگی وجود ندارد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    listOfBlog
                }
            })
        } catch (error) {
            next(error)
        }
    };
    async listOfBlogByCategory(req, res, next){
        try {
            const { catId } = req.params;
            
        } catch (error) {
            next(error)
        }
    }
    async checkBlogWithTitle(title){
        const blog = await BlogModel.findOne({title});
        if(blog) throw new createHttpError.BadRequest("عنوان بلاگ از قبل ثبت شده است، لطفا عنوان دیگری را انتخاب کنید");
        return blog;
    };
};

module.exports = {
    BlogController: new BlogController()
}