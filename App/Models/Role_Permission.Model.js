const { default: mongoose } = require("mongoose");

const RolePermissionSchema = new mongoose.Schema({
  role_id: {type: mongoose.Types.ObjectId, ref: "role", required: true},
  permission: {type: mongoose.Types.ObjectId, ref: "permission", required: true},
  createAt: {type: String, required: true, default: ""},
  updateAt: {type: String, default: ""},
});

module.exports = {
  RolePermissionModel: mongoose.model("role_permission", RolePermissionSchema)
};