const { default: mongoose } = require("mongoose");
const { COUPEN_STATUS } = require("../Utills/Constants");

const CoupenSchema = new mongoose.Schema({
    coupen_code: {type: String, required: true},
    title: {type: String},
    percent_discount: {type: Number, required: true},
    max_discount_amount: {type: Number, required: true},
    min_shopping_cart_amount: {type: Number, required: true},
    product_category_Id: {type: mongoose.Types.ObjectId, ref: "product_category"},
    product_Id: {type: mongoose.Types.ObjectId, ref: "product"},
    user_Id: {type: mongoose.Types.ObjectId, ref: "user"},
    start_date: {type: String, required: true},
    end_date: {type: String, required: true},
    total: {type: Number, required: true},
    number_uses_user: {type: Number, required: true},
    first_order: {type: Boolean, default: false},
    createdAt: {type: String},
    updatedAt: {type: String},
    status: {type: String, default: COUPEN_STATUS.UNACTIVE}
});

module.exports = {
    CoupenModel: mongoose.model("coupen", CoupenSchema)
};