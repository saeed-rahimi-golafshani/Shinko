const { default: mongoose } = require("mongoose");

const OrderSchema = new mongoose.Schema({
    order_Code: {type: String, required: true},
    order_date_created: {type: String, required: true},
    Order_time_created: {type: String, required: true},
    total_sales: {type: Number, default: 0, required: true},
    tax_total: {type: Number, default: 0},
    shipping_total: {type: Number, default: 0, required: true},
    coupen_total: {type: Number, default: 0},
    price_total: {type: Number, default: 0, required: true},
    order_category_Id: {type: mongoose.Types.ObjectId, ref: "order_category", required: true},
    shipping_method_id: {type: mongoose.Types.ObjectId, ref: "shipping_method", required: true},
    Shipping_Address_Id: {type: mongoose.Types.ObjectId, ref: "shipping_Address", required: true},
    order_status_Id: {type: mongoose.Types.ObjectId, ref: "order_status", required: true},
    shipping_type_Id: {type: mongoose.Types.ObjectId, ref: "shipping_type", required: true},
    coupen_Id: {type: mongoose.Types.ObjectId, ref: "coupen"},
    user_Id: {type: mongoose.Types.ObjectId, ref: "user", required: true}
}, {
    timestamps: true
});

module.exports = {
    OrderModel: mongoose.model("order", OrderSchema)
};