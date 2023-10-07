const createHttpError = require("http-errors");
const { BlogModel } = require("../../../../Models/Blog.Model");
const { createBlogSchema } = require("../../../Validations/Admin/Blog.Schema");
const Controller = require("../../Controller");
const { listOfImageFromRequest, 
    getFileOrginalname, 
    getFileEncoding, 
    getFileMimetype, 
    getFileSize, 
    getFileFilename, 
    checkExistOfModelById, 
    checkExistOfModelByTitle, 
    copyObject, 
    deleteInvalidPropertyObjectWithOutBlackList,
    deleteFileInPathArray, 
    createCounterCategory,
    updateCounterCategory, 
    deleteFolderInPath} = require("../../../../Utills/Public_Function");
const { FileModel } = require("../../../../Models/Files.Model");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { BlogCategoryModel } = require("../../../../Models/Blog_Category.Model");
const { UserModel } = require("../../../../Models/User.Model");

class BlogController extends Controller{
    async createBlog(req, res, next){
        try {
            const requestBody = await createBlogSchema.validateAsync(req.body);
            const { blog_category_Id, title, en_title, short_text, text, tags, reading_time } = requestBody;
            const fileAddress = listOfImageFromRequest(req.files.images || [], requestBody.fileUploadPath);
            await checkExistOfModelByTitle(title, BlogModel, fileAddress);
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
            const orginalName = getFileOrginalname(req.files['images']);
            const fileEncoding = getFileEncoding(req.files['images']);
            const mimeType = getFileMimetype(req.files['images']);
            const fileName = getFileFilename(req.files['images']);
            const fileSize = getFileSize(req.files['images']);
            const fileDetailes = await FileModel.create({
                type_Id: blog._id,
                files: type_files,
                type: "blog",
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
            await createCounterCategory(BlogCategoryModel, blog.blog_category_Id);

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
            const list_of_blog = await BlogModel.find({})
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
            const listOfblog = await BlogModel.findOne({_id: blog._id})
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
            const listOfBlog = await BlogModel.find({author: author._id});
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
            const category = await checkExistOfModelById(catId, BlogCategoryModel);
            const listOfBlog = await BlogModel.find({blog_category_Id: category._id}).populate([
                {path: "file_Id", select: {files: 1}},
                {path: "blog_category_Id", select: {title: 1, "children.$.title": 1}},
                {path: "author", select: {firstname: 1, lastname: 1, email: 1}}
            ]);
            if(!listOfBlog) throw new createHttpError.NotFound("بلاگی یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    listOfBlog
                }
            });
        } catch (error) {
            next(error)
        }
    };
    async updateBlog(req, res, next){
        try {
            const { id } = req.params;
            const blog = await checkExistOfModelById(id, BlogModel);
            const dataBody = copyObject(req.body);
            const fileId = await FileModel.findOne({type_Id: blog._id});
            if(dataBody.fileUploadPath && dataBody.filename){
                const files = listOfImageFromRequest(req.files.images || [], dataBody.fileUploadPath);
                const orginalName = getFileOrginalname(req.files['images']);
                const fileEncoding = getFileEncoding(req.files['images']);
                const mimeType = getFileMimetype(req.files['images']);
                const fileName = getFileFilename(req.files['images']);
                const fileSize = getFileSize(req.files['images']);
                deleteFileInPathArray(fileId.files);
                await FileModel.updateOne(
                    {
                      _id: fileId._id
                    }, 
                    {
                      files, 
                      originalnames: orginalName, 
                      encoding: fileEncoding,
                      mimetype: mimeType,
                      filename: fileName, 
                      size: fileSize
                    });
            }
            deleteInvalidPropertyObjectWithOutBlackList(dataBody);
            if(dataBody.blog_category_Id){
                updateCounterCategory(BlogCategoryModel, blog.blog_category_Id, dataBody.blog_category_Id)
            }
            const updateResault = await BlogModel.updateOne({_id: blog._id}, {$set: dataBody});
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
    async removeBlog(req, res, next){
        try {
            const { id } = req.params;
            const blog = await checkExistOfModelById(id, BlogModel);
            const file = await FileModel.findOne({type_Id: blog._id});
            if(!file || !blog) throw new createHttpError.NotFound("مقاله ای یافت نشد")
            deleteFolderInPath(file.files);
            const deleteResaultBlog = await BlogModel.deleteOne({_id: blog._id});
            const deleteResaultFile = await FileModel.deleteOne({_id: file._id});
            if(deleteResaultBlog.deletedCount == 0 || deleteResaultFile.deletedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "مقاله با موفقیت حذف گردید"
                }
            })
        } catch (error) {
            next(error)
        }
    }
};

module.exports = {
    BlogController: new BlogController()
}