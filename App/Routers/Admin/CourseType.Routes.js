const { CourseTypeConteroller } = require("../../Http/Controller/Admin/Course/CourseType.Controller");
const router = require("express").Router();

router.post("/create", CourseTypeConteroller.createCourseType);
router.get("/list", CourseTypeConteroller.listOfCourseType);
router.patch("/update/:id", CourseTypeConteroller.upadteOfCourseType);

module.exports = {
  AdminApiCourseTypeRoutes: router
}