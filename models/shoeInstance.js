const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShoeInstanceSchema = new Schema({
  shoe: { type: Schema.Types.ObjectId, ref: "Shoe", required: true },
  stockNumber: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Used", "New"],
    default: "New",
  },
  size: { type: Number, required: true },
});

ShoeInstanceSchema.virtual("url").get(function () {
  return `/products/shoeInstance/${this._id}`;
});

module.exports = mongoose.model("ShoeInstance", ShoeInstanceSchema);
