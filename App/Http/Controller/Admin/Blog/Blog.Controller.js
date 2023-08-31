const createHttpError = require("http-errors");
const { BlogModel } = require("../../../../Models/Blog.Model");
const { createBlogSchema } = require("../../../Validations/Admin/Blog.Schema");
const Controller = require("../../Controller");
const { listOfImageFromRequest, getFilesizeInBytes } = require("../../../../Utills/Public_Function");
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
            const blog = await BlogModel.create({blog_category_Id, title, en_title, short_text, text, tags, reading_time, author});
            if(!blog) throw new createHttpError.InternalServerError("خطای سروری");
            const types = listOfImageFromRequest(req.files.images || [], requestBody.fileUploadPath);
            const type_Id = blog._id;
            // const ext = path.extname(types);
            // const size = getFilesizeInBytes(types);
            const file = await FileModel.create({types, type_Id});
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