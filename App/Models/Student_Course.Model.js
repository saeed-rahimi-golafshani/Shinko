const { default: mongoose } = require("mongoose");

const StudentCourseSchema = new mongoose.Schema({
  course_Id: {type: mongoose.Types.ObjectId, ref: "course"},
  student_Id: {type: mongoose.Types.ObjectId, ref: "user"}
});

module.exports = {
  StudentCourseMOdel: mongoose.model("student_course", StudentCourseSchema)
}