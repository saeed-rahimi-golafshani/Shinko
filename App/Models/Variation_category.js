const { default: mongoose } = require("mongoose");

const VariationCategorySchema = new mongoose.Schema({
  product_category_id: {type: mongoose.Types.ObjectId, required: true, ref: "product_category"},
  variation_id: {type: mongoose.Types.ObjectId, required: true, ref: "variation"}
}, {
  toJSON: {
    virtuals: true
  }
});

module.exports = {
  VariationCategoryModel: mongoose.model("variation_category", VariationCategorySchema)
}