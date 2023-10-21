const { default: mongoose } = require("mongoose");

const BlogSchema = new mongoose.Schema({
    author: {type: mongoose.Types.ObjectId, ref: "user", required: true},
    blog_category_Id: {type: mongoose.Types.ObjectId, ref: "blog_category", required: true},
    file_Id: {type: mongoose.Types.ObjectId, ref: "file"},
    title: {type: String, required: true},
    en_title: {type: String, required: true},
    short_text: {type: String, required: true},
    text: {type: String, required: true},
    tags: {type: [String], default: []},
    reading_time: {type: String},
    show: {type: Boolean, default: false}    
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

BlogSchema.virtual("filesUrl").get( function(){
    return this.file_Id.files.map(file => `${process.env.BASEURL}:${process.env.APPLICATION_PORT}/${file}`)
});
BlogSchema.virtual("refrenceImage").get(function() {
   return `${process.env.BASEURL}:${process.env.APPLICATION_PORT}/${this.file_Id.files[0]}`
})

module.exports = {
    BlogModel: mongoose.model("blog", BlogSchema)
};