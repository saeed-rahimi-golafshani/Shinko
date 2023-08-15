const { default: mongoose } = require("mongoose");

const MenuSchema = new mongoose.Schema({
    title: {type: String},
    link: {type: String},
    icon: {type: String},
    description: {type: String},
    target: {type: String, default: "self"} // blank
}, {
    timestamps: true
});

module.exports = {
    MenuModel : mongoose.model("menu", MenuSchema)
};