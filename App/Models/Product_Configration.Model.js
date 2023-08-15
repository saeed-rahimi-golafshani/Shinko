const { default: mongoose } = require("mongoose");

const ProductConfigrationSchema = new mongoose.Schema({
    product_Id: {type: mongoose.Types.ObjectId, ref: "product", required: true},
    variation_option_Id: {type: mongoose.Types.ObjectId, ref: "variation_option", required: true}
});

module.exports = {
    ProductConfigrationModel: mongoose.model("product_configration", ProductConfigrationSchema)
};