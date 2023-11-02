const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gelSchema = new Schema({
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  caffeineAmount: { type: Number, required: true },
  flavor: { type: String, required: true },
});

gelSchema.virtual("url").get(function () {
  return `/catalog/gel/${this._id}`;
});

module.exports = mongoose.model("Gel", gelSchema);
