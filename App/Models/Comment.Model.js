const { default: mongoose } = require("mongoose");

const CommentShema = new mongoose.Schema({
    user_Id: {type: mongoose.Types.ObjectId, ref: "user", required: true},
    comment: {type: String, required: true},
    status: {type: String, default: "pending"},
    parent_comment: {type: mongoose.Types.ObjectId, ref: "comment", default: undefined},
    type: {type: String, required: true},
    type_id: {type: mongoose.Types.ObjectId, required: true},
    rating_value: {type: Number, default: 1},
    comment_date: {type: String}
}, {
    timestamps: true
});

module.exports = {
    CommentModel: mongoose.model("commnet", CommentShema)
};