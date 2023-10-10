const createHttpError = require("http-errors");
const { OfferNameModel } = require("../../../../Models/OfferName.Model");
const { deleteFileInPath, checkExistOfModelById, copyObject, deleteInvalidPropertyObjectWithOutBlackList } = require("../../../../Utills/Public_Function");
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
  };
  async listOfferName(req, res, next){
    try {
      const offerName = await OfferNameModel.find({}, {__v: 0});
      if(!offerName) throw new createHttpError.NotFound("گزینه مورد نظر یافت نشد")
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          offerName
        }
      });
    } catch (error) {
      next(error)
    }
  };
  async listOfferNameById(req, res, next){
    try {
      const { id } = req.params;
      const checkId = await checkExistOfModelById(id, OfferNameModel);
      const offerNames = await OfferNameModel.findOne({_id: checkId._id}, {__v: 0});
      if(!offerNames) throw new createHttpError.NotFound("گزینه مورد نظر یافت نشد")
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          offerNames
        }
      });
    } catch (error) {
      next(error)
    }
  };
  async updateOfferName(req, res, next){
    try {
      const { id } = req.params;
      const checkId = await checkExistOfModelById(id, OfferNameModel);
      const requestData = copyObject(req.body);
      if(requestData.fileUploadPath && requestData.filename){
        deleteFileInPath(checkId.icon);
        requestData.icon = path.join(requestData.fileUploadPath, requestData.filename).replace(/\\/g, "/");
      };
      deleteInvalidPropertyObjectWithOutBlackList(requestData);
      const updateResault = await OfferNameModel.updateOne({_id: checkId.id}, {$set: requestData});
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
  
}

module.exports = {
  OfferNameController: new OfferNameController()
}