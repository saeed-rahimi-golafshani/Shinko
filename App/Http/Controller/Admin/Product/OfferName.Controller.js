const createHttpError = require("http-errors");
const { OfferNameModel } = require("../../../../Models/OfferName.Model");
const { deleteFileInPath } = require("../../../../Utills/Public_Function");
const { crateOfferNameSchema } = require("../../../Validations/Admin/Product.Schema");
const Controller = require("../../Controller");
const path = require("path");
const { StatusCodes: httpStatus } = require("http-status-codes");

class OfferNameController extends Controller{
  async createOfferName(req, res, next){
    try {
      const requestBody = await crateOfferNameSchema.validateAsync(req.body);
      const { name, en_title } = requestBody;
      if(requestBody.fileUploadPath && requestBody.filename){
        req.body.icon = path.join(requestBody.fileUploadPath, requestBody.filename).replace(/\\/g, "/");
      };
      const checkOfferName = await OfferNameModel.findOne({name});
      const checkOfferEnTitle = await OfferNameModel.findOne({en_title});
      if(checkOfferName || checkOfferEnTitle){
        deleteFileInPath(req.body.icon);
        throw new createHttpError.BadRequest("این نام از قبل ثبت شده است، لطفا نام دیگری را انتخاب کنید");
      };
      const icon = req.body.icon;
      const createResault = await OfferNameModel.create({name, en_title, icon});
      if(!createResault){
        deleteFileInPath(req.body.icon);
        throw new createHttpError.InternalServerError("خطای سروری");
      };
      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        data: {
            message: "نام تخفیف با موفقیت ثبت گردید"
        }
      });
    } catch (error) {
      next(error)
    }
  }
}

module.exports = {
  OfferNameController: new OfferNameController()
}