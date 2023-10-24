const { default: mongoose } = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: {type: String, required: true},
    en_title: {type: String, required: true},
    short_text: {type: String, required: true},
    text: {type: String, required: true},
    tags: {type: [String], default: []},
    product_category_Id: {type: mongoose.Types.ObjectId, ref: "product_category", required: true},
    brand_Id: {type: mongoose.Types.ObjectId, ref: "brand", required: true},
    brand_productCat_Id: {type: mongoose.Types.ObjectId, ref: "brand_productCategory"},
    Product_Type_Id: {type: mongoose.Types.ObjectId, required: true, ref: "product_type"},
    file_Id: {type: mongoose.Types.ObjectId, ref: "file"},
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

ProductSchema.virtual("fileUrl").get(function(){
    console.log(this.file_Id.files);
    return this.file_Id.files.map(file => `${process.env.BASEURL}:${process.env.APPLICATION_PORT}/${file}`)
});
ProductSchema.virtual("refrenceImage").get(function() {
   return  `${process.env.BASEURL}:${process.env.APPLICATION_PORT}/${this.file_Id.files[0]}`
});
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
ProductSchema.index({title: "text", en_title: "text", producer: "text"})

module.exports = {
    ProductModel: mongoose.model("product", ProductSchema)
};