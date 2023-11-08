const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShoeSchema = new Schema({
  name: { type: String, required: true },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Unisex"],
    default: "Unisex",
  },
  price: { type: Number, required: true },
  category: {
    type: String,
    required: true,
    enum: ["Trail Runner", "Long Distance", "Walking", "Speed", "Lifestyle"],
    default: "Lifestyle",
  },
});

ShoeSchema.virtual("url").get(function () {
  return `/products/shoe/${this._id}`;
});

module.exports = mongoose.model("Shoe", ShoeSchema);
