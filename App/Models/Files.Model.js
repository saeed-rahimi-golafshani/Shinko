const { default: mongoose } = require("mongoose");

const FileSchema = new mongoose.Schema({
    types: {type: [String], required: true},
    type_Id: {type: mongoose.Types.ObjectId, reduired: true},
    originalnames: {type: [String], default: []},
    encoding: {type: [String], default: []},
    mimetype: {type: [String], default: []},
    filename: {type: [String], default: []},
    size: {type: String},    
}, {
    timestamps: true
});
FileSchema.virtual("typesUrl").get(function(){
    return this.types.map(files => `${process.env.BASEURL}:${process.env.APPLICATION_PORT}/${files}`)
});

module.exports = {
    FileModel: mongoose.model("file", FileSchema)
};