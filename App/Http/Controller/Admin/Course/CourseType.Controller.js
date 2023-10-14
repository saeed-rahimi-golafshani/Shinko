const Controller = require("../../Controller");

class CourseTypeConteroller extends Controller{
  async createCourseType(req, res, next){
    try {
      const requestBody = await 
    } catch (error) {
      next(error)
    }
  }
};

module.exports = {
  CourseTypeConteroller: new CourseTypeConteroller()
}