const { CourseController } = require("../../Http/Controller/Admin/Course/Course.Controller");
const router = require("express").Router();

router.post("/create", CourseController.createCourse);
router.get("/list", CourseController.listOfCourse);

module.exports = {
  AdminApiCourseRoutes: router
}