const createHttpError = require("http-errors");
const { CourseStatusModel } = require("../../../../Models/Course.Status.Model");
const { 
  checkExistOfModelByTitleWithoutFile, 
  checkExistOfModelById, 
  copyObject, 
  deleteInvalidPropertyObjectWithOutBlackList } = require("../../../../Utills/Public_Function");
const { createCourseStatusSchema } = require("../../../Validations/Admin/Course.Schema");
const Controller = require("../../Controller");
const { StatusCodes: httpStatus } = require("http-status-codes")

class CourseStatusController extends Controller{
  async createCourseStatus(req, res, next){
    try {
      const requestBody = await createCourseStatusSchema.validateAsync(req.body);
      const { title } = requestBody;
      checkExistOfModelByTitleWithoutFile(title, CourseStatusModel);
      const createResault = await CourseStatusModel.create({title});
      if(!createResault) throw new createHttpError.InternalServerError("خطای سروری");
      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        data: {
          message: "وضعیت دوره با موفقیت ثبت شد"
        }
      });
    } catch (error) {
      next(error)
    }
  };
  async listOfCourseStatus(req, res, next){
    try {
      const status = await CourseStatusModel.find({});
      if(!status) throw new createHttpError.NotFound("وضعیتی یافت نشد")
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          status
        }  
      })
    } catch (error) {
      next(error)
    }
  };
  async upadteOfCourseStatus(req, res, next){
    try {
      const { id } = req.params;
      const checkId = await checkExistOfModelById(id, CourseStatusModel);
      const requestData = copyObject(req.body);
      deleteInvalidPropertyObjectWithOutBlackList(requestData);
      const updateResault = await CourseStatusModel.updateOne({_id: checkId._id}, {$set: requestData});
      if(!updateResault) throw new createHttpError.InternalServerError("خطای سروری");
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
};

module.exports = { 
   CourseStatusController: new CourseStatusController()
}