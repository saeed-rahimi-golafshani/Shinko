const { default: mongoose } = require("mongoose");

const BlogSchema = new mongoose.Schema({
    author: {type: mongoose.Types.ObjectId, ref: "user", required: true},
    blog_category_Id: {type: mongoose.Types.ObjectId, ref: "blog_category", required: true},
    title: {type: String, required: true},
    short_text: {type: String, required: true},
    text: {type: String, required: true},
    tags: {type: [String], default: []},
    reading_time: {type: String},    
}, {
    timestamps: true
});

module.exports = {
    BlogModel: mongoose.model("blog", BlogSchema)
};