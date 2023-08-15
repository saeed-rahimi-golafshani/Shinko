const { default: mongoose } = require("mongoose");

const AddressSchema = new mongoose.Schema({
    user_Id: {type: mongoose.Types.ObjectId, ref: "user", required: true},
    state_Id: {type: mongoose.Types.ObjectId, ref: "state", required: true},
    city: {type: String, required: true},
    address1: {type: String, required: true},
    address2: {type: String},
    postalCode: {type: String, required: true},
    pelak: {type: String},
    is_Default: {type: Boolean, default: false}
}, {
    timestamps: true
});

module.exports = {
    AddressModel: mongoose.model("address", AddressSchema)
};