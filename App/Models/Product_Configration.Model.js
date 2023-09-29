const { default: mongoose } = require("mongoose");

const ProductConfigrationSchema = new mongoose.Schema({
    product_Id: {type: mongoose.Types.ObjectId, ref: "product", required: true},
    variation_option_Id: {type: mongoose.Types.ObjectId, ref: "variation_option", required: true}
}, {
    toJSON: {virtuals: true}
});

// ProductConfigrationSchema.virtual("variation_name", {
//     ref: "variation_option",
//     localField: "_id",
//     foreignField: "variation"
// });
// function autoPopulate(next){
//     this.populate([
//         {path: "variation_name", select: {__v: 0, id: 0, createdAt: 0, updatedAt: 0}}
//     ]);
//     next()
// };
// ProductConfigrationSchema.pre("findOne", autoPopulate).pre("find", autoPopulate);

module.exports = {
    ProductConfigrationModel: mongoose.model("product_configration", ProductConfigrationSchema)
};