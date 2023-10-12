const { default: mongoose } = require("mongoose");

const MenuSchema = new mongoose.Schema({
    title: {type: String},
    en_title: {type: String},
    description: {type: String},
    link: {type: String},
    target: {type: String, default: "_self"}, // _blank
    icon: {type: String},
    createAt: {type: String},
    updateAt: {type: String}
}, {
    toJSON: {virtuals: true} 
});

MenuSchema.virtual("iconUrl").get(function(){
    return `${process.env.BASEURL}:${process.env.APPLICATION_PORT}/${this.icon}`
});

module.exports = {
    MenuModel : mongoose.model("menu", MenuSchema)
};