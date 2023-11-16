const { default: mongoose } = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: {type: String, required: true},
    en_title: {type: String, required: true},
    product_category_Id: {type: mongoose.Types.ObjectId, ref: "product_category", required: true},
    brand_Id: {type: mongoose.Types.ObjectId, ref: "brand", required: true},
    brand_productCat_Id: {type: mongoose.Types.ObjectId, ref: "brand_productCategory"},
    main_price: {type: Number, default: 0},
    price: {type: Number, default: 0},
    discount: {type: Number, default: 0},
    preparation_time: {type: Number, default: 2},
    short_text: {type: String, required: true},
    text: {type: String, required: true},
    tags: {type: [String], default: []},
    returnable: {type: Boolean},
    publication_date: {type: String},
    publication_status: {type: Boolean, default: false},
    stock: {type: Number, default: 0},
    createdAt: {type: String},
    updatedAt: {type: String}
}, {
    toJSON: {virtuals: true}
});

ProductSchema.index({title: "text", en_title: "text", producer: "text"});
ProductSchema.virtual("stock_limite").get(function() {
    let stock_limit;
    switch (this.stock) {
        case 0:
            stock_limit = "ناموجود";
            break;
        case 1: 
            stock_limit = "تنها 1 عدد در انبار باقی است"
            break;
        case 2: 
            stock_limit = "تنها 2 عدد در انبار باقی است"
            break;
        default:
            stock_limit = ""
            break;
    }
    return stock_limit
});

module.exports = {
    ProductModel: mongoose.model("product", ProductSchema)
};