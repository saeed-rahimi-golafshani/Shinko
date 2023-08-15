const { default: mongoose } = require("mongoose");

const VotesSchema = new mongoose.Schema({
    type: {type: String, required: true},
    type_Id: {type: mongoose.Types.ObjectId, required: true},
    user_Id: {type: mongoose.Types.ObjectId, ref: "user", required: true},
    count: {type: Number, default: 0},
    // likes
    // dislikes
});

module.exports = {
    VotesModel: mongoose.model("votes", VotesSchema)
};