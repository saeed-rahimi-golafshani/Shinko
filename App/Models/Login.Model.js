const { default: mongoose } = require("mongoose");

const LoginSchema = new mongoose.Schema({
    user_Id: {type: mongoose.Types.ObjectId, ref: "user"},
    ip_Number: {type: String},
    browser_Type: {type: String},
    browser_Version: {type: String}
}, {
    timestamps: true
});

module.exports = {
    LoginModel: mongoose.model("login", LoginSchema)
};