const { default: mongoose } = require("mongoose");
const { ProductCategoryModel } = require("./Product_Category.Model");
const { VariationModel } = require("./Variation.Model");
const { VariationOptionModel } = require("./Variation_Option.Model");

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
    toJSON: {virtuals: true},
    toObject:{ virtuals: true}
});

// ProductSchema.virtual("product_category", {
//     ref: "product_category",
//     localField: "_id",
//     foreignField: "product_category_Id" 
// });
// ProductSchema.virtual("brand", { 
//     ref: "brand",
//     localField: "_id",
//     foreignField: "brand_Id"
// })
// ProductSchema.virtual("brand_productCategory", {
//     ref: "brand_productCategory",
//     localField: "_id",
//     foreignField: "brand_productCat_Id"
// })
// ProductSchema.virtual("product_type", {
//     ref: "product_type",
//     localField: "_id",
//     foreignField: "Product_Type_Id"
// })
// ProductSchema.virtual("file", {
//     ref: "file",
//     localField: "_id",
//     foreignField: "file_Id"
// });

ProductSchema.index({title: "text", en_title: "text", producer: "text"});
ProductSchema.virtual("fileUrl").get(function(){
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

module.exports = {
    ProductModel: mongoose.model("product", ProductSchema)
};