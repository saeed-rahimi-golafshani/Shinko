const { default: mongoose } = require("mongoose");

const OfferNameSchema = new mongoose.Schema({
  name: {type: String, required: true},
  en_title: {type: String, required: true},
  icon: {type: String}
});

module.exports = {
  OfferNameModel: mongoose.model("offername", OfferNameSchema)
};