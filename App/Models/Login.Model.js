const { default: mongoose } = require("mongoose");

const LoginSchema = new mongoose.Schema({
    user_Id: {type: mongoose.Types.ObjectId, ref: "user"},
    browser_Id: {type: mongoose.Types.ObjectId, ref: "browser"},
    ip_Number: {type: String},
}, {
    timestamps: true
});

module.exports = {
    LoginModel: mongoose.model("login", LoginSchema)
};