const { default: mongoose } = require("mongoose");

const ProductCategorySchema = new mongoose.Schema({
    title: {type: String, required: true},
    count: {type: Number, default: 0},
    icon: {type: String},
    text: {type: String},
    short_text: {type: String},
    tags: {type: [String], default: []},
    en_title: {type: String, require: true},
    showInArchive: {type: Boolean, default: false},
    priority: {type: String},
    parent_Category: {type: mongoose.Types.ObjectId, ref: "product_category", default: undefined}
}, {
    timestamps: true,
    versionKey: false,
    toJSON: {virtuals: true}
});

ProductCategorySchema.virtual("children", {
    ref: "product_category",
    localField: "_id",
    foreignField: "parent_Category"
});
function autoPopulate(next){
    this.populate([
        {path: "children", select: {__v: 0, id: 0, createdAt: 0, updatedAt: 0}}
    ]);
    next()
};
ProductCategorySchema.pre("findOne", autoPopulate).pre("find", autoPopulate);
ProductCategorySchema.index({title: "text"});
ProductCategorySchema.virtual("iconUrl").get(function(){
    return `${process.env.BASEURL}:${process.env.APPLICATION_PORT}/${this.icon}`
});
module.exports = {
    ProductCategoryModel: mongoose.model("product_category", ProductCategorySchema)
}