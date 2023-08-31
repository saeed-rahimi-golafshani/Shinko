const { default: mongoose } = require("mongoose");

const FileSchema = new mongoose.Schema({
    types: {type: [String], required: true},
    type_Id: {type: mongoose.Types.ObjectId, reduired: true},
    ext: {type: String},
    size: {type: String},
    type_File: {type: String}
}, {
    timestamps: true
});

module.exports = {
    FileModel: mongoose.model("file", FileSchema)
};