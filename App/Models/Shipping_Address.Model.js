const { default: mongoose } = require("mongoose");

const ShippingAddressSchema = new mongoose.Schema({
    shipping_method_Id: {type: mongoose.Types.ObjectId, ref: "shipping_method", required: true},
    address_Id: {type: mongoose.Types.ObjectId, ref: "address", required: true},
    user_Id: {type: mongoose.Types.ObjectId, ref: "user", required: true},
    price: {type: Number, default: 0}
});

module.exports = {
    ShippingModel: mongoose.model("shipping_Address", ShippingAddressSchema)
};