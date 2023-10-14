const { default: mongoose } = require("mongoose");

const CourseTypeSchema = new mongoose.Schema({
  title: {type: String}
});

module.exports = {
  CourseTypeModel: mongoose.model("course_type", CourseTypeSchema)
}