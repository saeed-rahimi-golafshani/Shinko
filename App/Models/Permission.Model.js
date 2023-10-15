const { default: mongoose } = require("mongoose");

const PermissionSchema = new mongoose.Schema({
    title: {type: String, required: true},
    slug: {type: String, required: true},
    description: {type: String},
    active: {type: Number, required: true, default: 0}, // 1 => true, 0 => false
    createAt: {type: String, required: true, default: ""},
    updateAt: {type: String, default: ""},
    content: {type: String}
});

module.exports = {
    permissionModel: mongoose.model("permission", PermissionSchema)
}