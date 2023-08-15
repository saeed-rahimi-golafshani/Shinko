const { default: mongoose } = require("mongoose");

const ProductTypeSchema = new mongoose.Schema({
    typeName: {type: String, required: true}
});

module.exports = {
    ProductTypeModel: mongoose.model("product_type", ProductTypeSchema)
};