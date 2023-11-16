const { default: mongoose } = require("mongoose");

const FileSchema = new mongoose.Schema({
    type_Id: {type: mongoose.Types.ObjectId, required: true, refPath: "typeModel"},
    file_refrence: {type: [String]},
    files: {type: [String]},
    originalnames: {type: [String], default: []},
    encoding: {type: [String], default: []},
    mimetype: {type: [String], default: []},
    filename: {type: [String], default: []},
    size: {type: String},    
    type: {
        type: String,
        required: true,
        enum: ['product', 'blog']
    },
    createdAt: {type: String},
    updatedAt: {type: String},
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});


module.exports = {
    FileModel: mongoose.model("file", FileSchema)
};