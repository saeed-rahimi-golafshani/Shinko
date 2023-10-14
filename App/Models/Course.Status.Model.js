const { default: mongoose } = require("mongoose");

const CourseStatusSchema = new mongoose.Schema({
  title: {type: String}
});

module.exports = {
  CourseStatusModel: mongoose.model("course_status", CourseStatusSchema)
}