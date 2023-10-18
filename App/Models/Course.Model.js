const { default: mongoose } = require("mongoose");

const CourseSchema = new mongoose.Schema({
  product_Id: {type: mongoose.Types.ObjectId, required: true, ref: "product"},
  courseType_Id: {type: mongoose.Types.ObjectId, required: true, ref: "course_type"},
  courseStatus_Id: {type: mongoose.Types.ObjectId, required: true, ref: "course_status"},
  teacher: {type: mongoose.Types.ObjectId, required: true, ref: "user"}
});

module.exports = {
  CourseModel: mongoose.model("course", CourseSchema)
}