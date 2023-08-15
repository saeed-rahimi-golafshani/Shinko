const { default: mongoose } = require("mongoose");

const VariationOptionSchema = new mongoose.Schema({
    variation_Id: {type: mongoose.Types.ObjectId, ref: "variation", required: true},
    value: {type: String}
});

module.exports = {
    VariationOptionModel: mongoose.model("variation_option", VariationOptionSchema)
};