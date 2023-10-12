const createHttpError = require("http-errors");
const { MenuModel } = require("../../../../Models/Menu.Model");
const { deleteFileInPath } = require("../../../../Utills/Public_Function");
const { createMenuSchema } = require("../../../Validations/Admin/Menu.Schema");
const Controller = require("../../Controller");
const path = require("path");
const { StatusCodes: httpStatus } = require("http-status-codes")

class MenueController extends Controller{
  async createMenu(req, res, next){
    try {
      const requestBody = await createMenuSchema.validateAsync(req.body);
      const { title, en_title, description, link, target} = requestBody;
      if(requestBody.fileUploadPath && requestBody.filename){
        req.body.icon = path.join(requestBody.fileUploadPath, requestBody.filename).replace(/\\/g, "/");
      }
      const checkTitle = await MenuModel.findOne({title, en_title});
      if(checkTitle){
        deleteFileInPath(req.body.icon)
        throw new createHttpError.BadRequest("این عنوان از قبل ثبت شده است، لطفا عنوان دیگری را انتخاب کنید");
      };
      const icon = req.body.icon;
      const createDate = new Date();
      const updateDate = new Date();
      const createResault = await MenuModel.create(
        {
          title,
          en_title,
          description,
          link,
          target,
          createAt: createDate,
          updateAt: updateDate,
          icon
        });
        if(!createResault) throw new createHttpError.InternalServerError("خطای سروری");
        return res.status(httpStatus.CREATED).json({
          statusCode: httpStatus.CREATED,
          data: {
            message: "منو با موفقیت ثبت شد"
          }
        });      
    } catch (error) {
      next(error)
    }
  };
  async listOfMenu(req, res, next){
    try {
      const menus = await MenuModel.find({});
      if(!menus) throw new createHttpError.NotFound("منویی یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          menus
        }
      });
    } catch (error) {
      next(error)
    }
  }
}

module.exports = {
  MenueController: new MenueController() 
}