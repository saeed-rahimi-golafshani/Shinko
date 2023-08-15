const { default: mongoose, mongo } = require("mongoose");

const CitySchema = new mongoose.Schema({
    state_Id: {type: mongoose.Types.ObjectId, ref: "state", required: true},
    cityName: {type: String, required: true}
});

module.exports = {
    CityModel: mongoose.model("city", CitySchema)
};