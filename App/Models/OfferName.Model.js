const { default: mongoose } = require("mongoose");

const OfferNameSchema = new mongoose.Schema({
  name: {type: String, required: true},
  en_title: {type: String, required: true},
  icon: {type: String}
}, {
  toJSON: {virtuals: true}
});
OfferNameSchema.virtual("iconURL").get(function(){
  return `${process.env.BASEURL}:${process.env.APPLICATION_PORT}/${this.icon}`
});

module.exports = {
  OfferNameModel: mongoose.model("offername", OfferNameSchema)
};