const { default: mongoose } = require("mongoose");

const ChapterSchema = mongoose.Schema({
    course_Id: {type: mongoose.Types.ObjectId, ref: "course", required: true},
    title: {type: String, required: true},
    text: {type: String, required: true}
}, {
    timestamps: true
});

module.exports = {
    ChapterModel: mongoose.model("chapter", ChapterSchema)
};