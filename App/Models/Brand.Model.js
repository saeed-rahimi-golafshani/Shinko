const { default: mongoose } = require("mongoose");

const BrandSchema = new mongoose.Schema({
    title: {type: String, required: true},
    en_title: {type: String, required: true},
    description: {type: String},
    tags: {type: [String], default: []},
    show: {type: Boolean, default: false}
});

module.exports = {
    BrandModel: mongoose.model("brand", BrandSchema)
};