const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WatchSchema = new Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

WatchSchema.virtual("url").get(function () {
  return `/products/watch/${this._id}`;
});

module.exports = mongoose.model("Watch", WatchSchema);
