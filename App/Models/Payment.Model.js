const { default: mongoose } = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    invoiceNumber: {type: String},
    port: {type: String},
    port_Id: {type: String}, // authority
    payment_date: {type: String},
    totalPrice: {type: Number, default: 0},
    description: {type: String},
    verify: {type: Boolean, default: false},
    user_Id: {type: mongoose.Types.ObjectId, ref: "user", required: true},
    order_id: {type: mongoose.Types.ObjectId, ref: "order", required: true},
    refId: {type: String, default: undefined},
    cardHash: {type: String}
});

module.exports = {
    PaymentModel: mongoose.model("payment", PaymentSchema)
};