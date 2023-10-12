const { default: mongoose } = require("mongoose");

const BrandSchema = new mongoose.Schema({
    title: {type: String, required: true},
    en_title: {type: String, required: true},
    description: {type: String},
    tags: {type: [String], default: []},
    show: {type: Boolean, default: false},
    icon: {type: String},
    count: {type: Number, default: 0}
}, {
    toJSON: {virtuals: true}
});

BrandSchema.index({title: "text", en_title: "text"});
BrandSchema.virtual("iconUrl").get(function(){
    return `${process.env.BASEURL}:${process.env.APPLICATION_PORT}/${this.icon}`
});

module.exports = {
    BrandModel: mongoose.model("brand", BrandSchema)
};