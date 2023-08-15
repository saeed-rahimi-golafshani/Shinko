const { default: mongoose } = require("mongoose");

const TaxSchema = new mongoose.Schema({
    tax_rate: {type: Number, default: 0, required: true},
    tax_rate_name: {type: String},
    type: {type: String}
});

module.exports = {
    TaxModel: mongoose.model("tax", TaxSchema)
};