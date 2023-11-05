const ShoeInstance = require("../models/shoeInstance");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.getShoeInstanceList = asyncHandler(async (req, res, next) => {
  const allShoeInstances = await ShoeInstance.find({}).exec();

  res.render("shoeInstanceList", {
    title: "Shoe Instances",
    shoeInstances: allShoeInstances,
  });
});
