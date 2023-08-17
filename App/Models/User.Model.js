const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstname: {type: String},
    lastname: {type: String},
    username: {type: String},
    mobile: {type: String, required: true},
    email: {type: String, lowercase: true},
    birthday: {type: String},
    role: {type: String, default: "USER"},
    active: {type: Boolean, default: true},
}, {
    timestamps: true,
    toJSON: {virtuals: true}
});

module.exports = {
    UserModel: mongoose.model("user", UserSchema)
};