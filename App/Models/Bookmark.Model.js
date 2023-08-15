const { default: mongoose } = require("mongoose");

const BookmarkSchema = new mongoose.Schema({
    user_Id: {type: mongoose.Types.ObjectId, ref: "user", required: true},
    bookmark_Name: {type: String},
    bookmark_Url: {type: String} 
});

module.exports = {
    BookmarkModel: mongoose.model("bookmark", BookmarkSchema)
};