const { default: mongoose } = require("mongoose");

const RoleSchema = new mongoose.Schema({
    title: {type: String, required: true},
    permission_Id: {type: mongoose.Types.ObjectId, ref: "permission", required: true},
    description: {type: String}
});

module.exports = {
    RoleModel: mongoose.model("role", RoleSchema)
};