const { default: mongoose } = require("mongoose");

const ActivationSchema = new mongoose.Schema({
    user_Id: {type: mongoose.Types.ObjectId, ref: "user", required: true},
    otp: {type: Object, default: {code: 0, expiresIn: 0}},
    type: {type: String, default: "mobile"}
}, {
    timestamps: true
});

module.exports = {
    ActivationModel: mongoose.model("activation", ActivationSchema)
}