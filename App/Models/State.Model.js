const { default: mongoose, mongo } = require("mongoose");

const StateSchema = new mongoose.Schema({
    stateName: {type: String, required: true}
});

module.exports = {
    StateModel: mongoose.model("state", StateSchema)
};