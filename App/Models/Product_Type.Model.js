const { default: mongoose } = require("mongoose");

const ProductTypeSchema = new mongoose.Schema({
    type_name: {type: String, required: true}
});

module.exports = {
    ProductTypeModel: mongoose.model("product_type", ProductTypeSchema)
};