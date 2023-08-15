const { default: mongoose } = require("mongoose");

const ChapterSchema = mongoose.Schema({
    product_Id: {type: mongoose.Types.ObjectId, ref: "product", required: true},
    title: {type: String, required: true},
    text: {type: String, required: true}
}, {
    timestamps: true
});

module.exports = {
    ChapterModel: mongoose.model("chapter", ChapterSchema)
};