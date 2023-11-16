const { default: mongoose } = require("mongoose");

const VariationSchema = new mongoose.Schema({
    title: {type: String, required: true},
    en_title: {type: String},
    icon: {type: String},
    show_in_archive: {type: Boolean, default: false},
    show_in_up: {type: Boolean, default: false}
}, {
    toJSON: {
        virtuals: true
    }
});

VariationSchema.index({title: "text"})

module.exports = {
    VariationModel: mongoose.model("variation", VariationSchema)
};