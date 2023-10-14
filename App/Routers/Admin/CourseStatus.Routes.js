const { CourseStatusController } = require("../../Http/Controller/Admin/Course/CourseStatus.Controller");
const router = require("express").Router();

router.post("/create", CourseStatusController.createCourseStatus);
router.get("/list", CourseStatusController.listOfCourseStatus);
router.patch("/update/:id", CourseStatusController.upadteOfCourseStatus);

module.exports = {
  AdminApiCourseStatusRoutes: router
}