const { default: mongoose } = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: {type: String, required: true},
    en_title: {type: String, required: true},
    short_text: {type: String, required: true},
    text: {type: String, required: true},
    tags: {type: [String], default: []},
    product_category_Id: {type: mongoose.Types.ObjectId, required: true, ref: "product_category"},
    Product_Type_Id: {type: mongoose.Types.ObjectId, required: true, ref: "product_type"},
    producer: {type: String},
    status: {type: String},
    stock: {type: Number, default: 0},
    active: {type: Boolean, default: false},
    main_price: {type: Number, default: 0},
    discount: {type: Number, default: 0},
    price: {type: Number, default: 0},
    send_date: {type: String},
    returned: {type: Boolean}
}, {
    timestamps: true,
    toJSON: {virtuals: true}
});

module.exports = {
    ProductModel: mongoose.model("product", ProductSchema)
};