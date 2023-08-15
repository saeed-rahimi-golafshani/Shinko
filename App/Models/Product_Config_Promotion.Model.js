const { default: mongoose } = require("mongoose");

const ProductConfigPromotionSchema = new mongoose.Schema({
    product_Id: {type: mongoose.Types.ObjectId, ref: "product", required: true},
    variation_option_Id: {type: mongoose.Types.ObjectId, ref: "variation_option", required: true},
    stock: {type: Number, default: 0},
    mainPrice: {type: Number, default: 0},
    discount: {type: Number, default: 0},
    price: {type: Number, default: 0},
    start_date: {type: String, required: true},
    end_date: {type: String, required: true},
    name: {type: String},
    description: {type: String}
}, {
    timestamps: true
});

module.exports = {
    ProductConfigPromotionModel: mongoose.model("product_config_promotion", ProductConfigPromotionSchema)
};