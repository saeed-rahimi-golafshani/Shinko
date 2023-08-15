const { default: mongoose } = require("mongoose");

const OrderCategorySchema = new mongoose.Schema({
    status: {type: String}
})

module.exports = {
    OrderCategoryModel: mongoose.model("order_category", OrderCategorySchema)
};