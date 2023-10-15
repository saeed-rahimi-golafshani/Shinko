const createHttpError = require("http-errors");
const { CourseTypeModel } = require("../../../../Models/Course_Type.Model");
const { 
  checkExistOfModelByTitleWithoutFile, 
  deleteInvalidPropertyObjectWithOutBlackList, 
  copyObject, 
  checkExistOfModelById} = require("../../../../Utills/Public_Function");
const { createCourseTypeSchema } = require("../../../Validations/Admin/Course.Schema");
const Controller = require("../../Controller");
const { StatusCodes: httpStatus } = require("http-status-codes")

class CourseTypeConteroller extends Controller{
  async createCourseType(req, res, next){
    try {
      const requestBody = await createCourseTypeSchema.validateAsync(req.body);
      const { title } = requestBody;
      checkExistOfModelByTitleWithoutFile(title, CourseTypeModel);
      const createResault = await CourseTypeModel.create({title});
      if(!createResault) throw new createHttpError.InternalServerError("خطای سروری");
      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        data: {
          message: "نوع دوره با موفقیت ثبت شد"
        }
      }); 
    } catch (error) {
      next(error)
    }
  };
  async listOfCourseType(req, res, next){
    try {
      const courseType = await CourseTypeModel.find({}, {__v: 0});
      if(!courseType) throw new createHttpError.NotFound("نوع دوره ای یافت نشد")
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          courseType
        }  
      })
    } catch (error) {
      next(error)
    }
  }
  async upadteOfCourseType(req, res, next){
    try {
      const { id } = req.params;
      const checkId = await checkExistOfModelById(id, CourseTypeModel);
      const requestData = copyObject(req.body);
      deleteInvalidPropertyObjectWithOutBlackList(requestData);
      const updateResault = await CourseTypeModel.updateOne({_id: checkId._id}, {$set: requestData});
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
  CourseTypeConteroller: new CourseTypeConteroller()
}