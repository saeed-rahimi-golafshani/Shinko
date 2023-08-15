const { default: mongoose } = require("mongoose");

const ShippingTypeSchema = new mongoose.Schema({
    typeName: {type: String}
});

module.exports = {
    ShippingTypeModel: mongoose.model("shipping_type", ShippingTypeSchema)
};



