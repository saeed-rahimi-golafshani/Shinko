const { default: mongoose } = require("mongoose");

const FileSchema = new mongoose.Schema({
    files: {type: [String]},
    type: {type: String, required: true},
    originalnames: {type: [String], default: []},
    encoding: {type: [String], default: []},
    mimetype: {type: [String], default: []},
    filename: {type: [String], default: []},
    size: {type: String},    
}, {
    timestamps: true
});

module.exports = {
    FileModel: mongoose.model("file", FileSchema)
};