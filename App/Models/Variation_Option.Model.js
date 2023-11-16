const { default: mongoose } = require("mongoose");

const VariationOptionSchema = new mongoose.Schema({
    variation_Id: {type: mongoose.Types.ObjectId, ref: "variation", required: true},
    title: {type: String, required: true}
}, {
    toJSON: {
        virtuals: true
    }
});

module.exports = {
    VariationOptionModel: mongoose.model("variation_option", VariationOptionSchema)
};