const createHttpError = require("http-errors");
const { CourseTypeModel } = require("../../../../Models/Course_Type.Model");
const { checkExistOfModelByTitleWithoutFile } = require("../../../../Utills/Public_Function");
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
  }
};

module.exports = {
  CourseTypeConteroller: new CourseTypeConteroller()
}