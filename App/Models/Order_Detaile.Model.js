const { default: mongoose } = require("mongoose");

const OrderDetaileSchema = new mongoose.Schema({
    order_Id: {type: mongoose.Types.ObjectId, ref: "order", required: true},
    product_Id: {type: mongoose.Types.ObjectId, ref: "product", required: true},
    user_Id: {type: mongoose.Types.ObjectId, ref: "user", required: true},
    coupen_Id: {type: mongoose.Types.ObjectId, ref: "coupen"},
    date_created: {type: String},
    stock: {type: Number, default: 0, required: true},
    tax_amount: {type: Number, default: 0},
    detail: {type: String},
    price: {type: Number, default: 0},
    price_discount: {type: Number, default: 0},
    total_price: {type: Number, default: 0}
});

module.exports = {
    OrderDetailModel: mongoose.model("order_detail", OrderDetaileSchema)
};