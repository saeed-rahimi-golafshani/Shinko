const createHttpError = require("http-errors");
const { CourseModel } = require("../../../../Models/Course.Model");
const { createCourseSchema } = require("../../../Validations/Admin/Course.Schema");
const Controller = require("../../Controller");
const { StatusCodes: httpStatus } = require("http-status-codes");

class CourseController extends Controller{
  async createCourse(req, res, next){
    try {
      const requestBody = await createCourseSchema.validateAsync(req.body);
      const { product_Id, courseType_Id, courseStatus_Id, teacher } = requestBody;
      const craeteResault = await CourseModel.create({product_Id, courseStatus_Id, courseType_Id, teacher});
      if(!craeteResault) throw new createHttpError.InternalServerError("خطای سروری");
      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        data: {
          message: "دوره آموزشی با موفقیت ثبت شد"
        }
      });

    } catch (error) {
      next(error)
    }
  };
  async listOfCourse(req, res, next){
    try {
      const coursies = await CourseModel.find({}).populate([
        {path: "courseType_Id", select: {title: 1}},
        {path: "courseStatus_Id", select: {title: 1}},
        {path: "teacher", select: {firstname: 1, lastname: 1}},
      ]);
      if(!coursies) throw new createHttpError.NotFound("دوره ای یافت نشد")
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          coursies
        }
      });
    } catch (error) {
      next(error)
    }
  }
};

module.exports = {
  CourseController: new CourseController()
}