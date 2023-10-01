const { default: mongoose } = require("mongoose");

const ProductConfigAdvancedSchema = new mongoose.Schema({
    product_Id: {type: mongoose.Types.ObjectId, ref: "product", required: true},
    variation_option_Id: {type: mongoose.Types.ObjectId, ref: "variation_option", required: true},
    stock: {type: Number, default: 0},
    main_price: {type: Number, default: 0},
    discount: {type: Number, default: 0},
    price: {type: Number, default: 0}
},{
    timestamps: true,
    toJSON: {virtuals: true}
});

module.exports = {
    ProductConfigAdvancedModel: mongoose.model("product_config_advanced", ProductConfigAdvancedSchema)
};