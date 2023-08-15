const { default: mongoose } = require("mongoose");

const VariationSchema = new mongoose.Schema({
    product_category_Id: {type: mongoose.Types.ObjectId, ref: "product_category", required: true},
    name: {type: String, required: true}
});

module.exports = {
    VariationModel: mongoose.model("variation", VariationSchema)
};