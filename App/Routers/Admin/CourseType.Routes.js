const { CourseTypeConteroller } = require("../../Http/Controller/Admin/Course/CourseType.Controller");
const router = require("express").Router();

router.post("/create", CourseTypeConteroller.createCourseType);

module.exports = {
  AdminApiCourseTypeRoutes: router
}