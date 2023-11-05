const { default: mongoose } = require("mongoose");
const { USER_STATUS, USER_SEX } = require("../Utills/Constants");

const UserSchema = new mongoose.Schema({
    role_Id: {type: mongoose.Types.ObjectId, ref: "role"},
    firstname: {type: String},
    lastname: {type: String},
    username: {type: String},
    mobile: {type: String, required: true},
    email: {type: String, lowercase: true},
    birthday: {type: String},
    status: {type: String, default: USER_STATUS.ACTIVE},
    sex: {type: String, default: USER_SEX.UNKNOWN},
    representative: {type: String}, // معرف
    bank_cart: {type: String},
    wallet: {type: Number, default: 0},
    rate: {type: Number, default: 0},
    access_profile: {type: Boolean, default: true},
    Phone_verification: {type: Boolean, default: false},
    email_verification: {type: Boolean, default: false},
    createdAt: {type: String, required: true, default: ""},
    updatedAt: {type: String, default: ""},
}, {
    toJSON: {virtuals: true}
});

module.exports = {
    UserModel: mongoose.model("user", UserSchema)
};