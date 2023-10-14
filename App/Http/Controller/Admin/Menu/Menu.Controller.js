const createHttpError = require("http-errors");
const { MenuModel } = require("../../../../Models/Menu.Model");
const { 
  deleteFileInPath, 
  checkExistOfModelById, 
  copyObject, 
  deleteInvalidPropertyObject } = require("../../../../Utills/Public_Function");
const { createMenuSchema } = require("../../../Validations/Admin/Menu.Schema");
const Controller = require("../../Controller");
const path = require("path");
const { StatusCodes: httpStatus } = require("http-status-codes");
const menuBlackList = {
  CREATEAT: "createAt",
  UPDATEAT: "updateAt"
}
Object.freeze(menuBlackList);

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
      const { search } = req.query;
      let menus;
      if(search){
        menus = await MenuModel.findOne(
          {
            $text: {
              $search: new RegExp(search, "ig")
            }
          }, 
          {
            __v: 0
          }
        );
      } else {
        menus = await MenuModel.find({}, {__v: 0})
      }
      
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
  };
  async listOfMenuById(req, res, next){
    try {
      const { id } = req.params;
      const checkId = await checkExistOfModelById(id, MenuModel);
      const menu = await MenuModel.findOne({_id: checkId._id}, {__v: 0});
      if(!menu) throw new createHttpError.InternalServerError("خطای سروری");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          menu
        }
      });
    } catch (error) {
      next(error)
    }
  };
  async updateMenu(req, res, next){
    try {
      const { id } = req.params;
      const checkId = await checkExistOfModelById(id, MenuModel);
      const requestData = copyObject(req.body);
      if(requestData.fileUploadPath && requestData.filename){
        deleteFileInPath(checkId.icon);
        requestData.icon = path.join(requestData.fileUploadPath, requestData.filename).replace(/\\/g, "/");
      };
      let blackFeildList = Object.values(menuBlackList);
      deleteInvalidPropertyObject(requestData, blackFeildList);
      const updateAt = new Date();
      const updateResault = await MenuModel.updateOne({_id: checkId._id}, {$set: requestData, updateAt});
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
  };
  async removeMenu(req, res, next){
    try {
      const { id } = req.params;
      const checkId = await checkExistOfModelById(id, MenuModel);
      const deleteResault = await MenuModel.deleteOne({_id: checkId._id});
      if(deleteResault.deletedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
      deleteFileInPath(checkId.icon);
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
            message: "دسته بندی مقالات با موفقیت حذف شد"
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