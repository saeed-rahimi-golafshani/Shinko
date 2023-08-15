const { default: mongoose } = require("mongoose");

const CoupenSchema = new mongoose.Schema({
    user_Id: {type: mongoose.Types.ObjectId, ref: "user", required: true},
    product_Id: {type: mongoose.Types.ObjectId, ref: "product", required: true},
    product_category_Id: {type: mongoose.Types.ObjectId, ref: "product_category", required: true},
    coupen_descount: {type: Number, default: 0},
    coupen_max: {type: Number, default: 0},
    coupen_count: {type: Number, default: 0},
    coupen_code: {type: String},
    just_send_free: {type: Boolean, default: false},
    start_date: {type: String},
    end_date: {type: String},
}, {
    timestamps: true
});

module.exports = {
    CoupenModel: mongoose.model("coupen", CoupenSchema)
};