const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SockSchema = new Schema({
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: Number, required: true },
});

SockSchema.virtual("url").get(function () {
  return `catalog/socks/${this._id}`;
});

module.exports = mongoose.model("Socks", SockSchema);
