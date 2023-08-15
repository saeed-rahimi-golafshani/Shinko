const { default: mongoose } = require("mongoose");

const PermissionSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String}
});

module.exports = {
    permissionModel: mongoose.model("permission", PermissionSchema)
}