const createHttpError = require("http-errors");
const { BlogModel } = require("../../../../Models/Blog.Model");
const { createBlogSchema } = require("../../../Validations/Admin/Blog.Schema");
const Controller = require("../../Controller");
const { listOfImageFromRequest, getFileOrginalname, getFileEncoding, getFileMimetype, getFileSize, getFileFilename } = require("../../../../Utills/Public_Function");
const path = require("path");
const { FileModel } = require("../../../../Models/Files.Model");
const { StatusCodes: httpStatus } = require("http-status-codes");


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
            // --------- craete file model -------------------
            const types = listOfImageFromRequest(req.files.images || [], requestBody.fileUploadPath);
            const type_Id = blog._id;
            const orginalName = getFileOrginalname(req.files['images']);
            const fileEncoding = getFileEncoding(req.files['images']);
            const mimeType = getFileMimetype(req.files['images']);
            const fileName = getFileFilename(req.files['images']);
            const fileSize = getFileSize(req.files['images']);
            const file = await FileModel.create({
                types, 
                type_Id, 
                originalnames: orginalName,
                encoding: fileEncoding,
                mimetype: mimeType,
                filename: fileName,
                size: fileSize
            });
            // ----------------- 
            if(!file) throw new createHttpError.InternalServerError("خطای سروری");
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
    async checkBlogWithTitle(title){
        const blog = await BlogModel.findOne({title});
        if(blog) throw new createHttpError.BadRequest("عنوان بلاگ از قبل ثبت شده است، لطفا عنوان دیگری را  انتخاب کنید");
        return blog;
    }
};

module.exports = {
    BlogController: new BlogController()
}