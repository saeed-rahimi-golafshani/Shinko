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
BlogCategorySchema.virtual("children", {
    ref: "blog_category",
    localField: "_id",
    foreignField: "parent_Category"
});
function autoPopulate(next){
    this.populate([
        {path: "children", select: {__v: 0, id: 0, createdAt: 0, updatedAt: 0}}
    ]);
    next()
}
BlogCategorySchema.pre("findOne", autoPopulate).pre("find", autoPopulate)

BlogCategorySchema.virtual("iconUrl").get(function(){
    return `${process.env.BASEURL}:${process.env.APPLICATION_PORT}/${this.icon}`
});
module.exports = {
    BlogCategoryModel: mongoose.model("blog_category", BlogCategorySchema)
};