const { default: mongoose } = require("mongoose");

const BlogCategorySchema = new mongoose.Schema({
    title: {type: String, required: true},
    en_title: {type: String, require: true},
    count: {type: Number, default: 0},
    icon: {type: String},
    showInArchive: {type: Boolean, default: false},
    priority: {type: String},
    parent_Category: {type: mongoose.Types.ObjectId, ref: "blog_category", default: undefined}
}, {
    timeseries: true,
    versionKey: false,
    toJSON: {virtuals: true}
});

module.exports = {
    BlogCategoryModel: mongoose.model("blog_category", BlogCategorySchema)
};