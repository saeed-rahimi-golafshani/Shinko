const { default: mongoose } = require("mongoose");

const ProductCategorySchema = new mongoose.Schema({
    title: {type: String, required: true},
    count: {type: Number, default: 0},
    icon: {type: String},
    text: {type: String},
    short_text: {type: String},
    tags: {type: [String], default: []},
    showInArchive: {type: Boolean, default: false},
    priority: {type: String},
    parent_Category: {type: mongoose.Types.ObjectId, ref: "product_category", default: undefined}
}, {
    timestamps: true,
    versionKey: false,
    toJSON: {virtuals: true}
});

module.exports = {
    ProductCategoryModel: mongoose.model("product_category", ProductCategorySchema)
}