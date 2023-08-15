const { default: mongoose, model } = require("mongoose");

const ShippingMethodSchema = new mongoose.Schema({
    method: {type: String}
});

module.exports = {
    ShippingMethodModel: mongoose.model("shipping_method", ShippingMethodSchema)
};