const { default: mongoose, model } = require("mongoose");

const Brand_ProductCategorySchema = new mongoose.Schema({
  brand_Id: {type: mongoose.Types.ObjectId, ref: "brand", required: true},
  productCategory_Id: {type: mongoose.Types.ObjectId, ref: "product_category", required: true},
  title: {type: String, required: true},
  count: {type: Number, default: 0}
});

module.exports = {
  BrandProductCategoryModel: mongoose.model("brand_productCategory", Brand_ProductCategorySchema)
}