const { default: mongoose } = require("mongoose");

const OrderStatusSchema = new mongoose.Schema({
    status: {type: String}
})

module.exports = {
    OrderStatusModel: mongoose.model("order_status", OrderStatusSchema)
};