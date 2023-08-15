const { default: mongoose } = require("mongoose");

const PasswordSchema = new mongoose.Schema({
    user_Id: {type: mongoose.Types.ObjectId, ref: "user", required: true},
    password: {type: String, required: true},
    type: {type: String, default: "EMAIL"},
    date: {type: String, default: "0:0:0"},
    active: {type: Boolean, default: false},
    forget_Password: {type: String}
}, {
    timestamps: true
});

module.exports = {
    PasswordModel: mongoose.model("password", PasswordSchema)
};