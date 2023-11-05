const ShoeInstance = require("../models/shoeInstance");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.getShoeInstanceList = asyncHandler(async (req, res, next) => {
  const allShoeInstances = await ShoeInstance.find({}).populate("shoe").exec();

  res.render("shoeInstanceList", {
    title: "Shoe Instances",
    shoeInstances: allShoeInstances,
  });
});

exports.getShoeInstanceDetails = asyncHandler(async (req, res, next) => {
  const shoeInstance = await ShoeInstance.findById(req.param.id);

  res.render("shoeInstanceDetails", {
    title: "Shoe Instance Details",
    shoeInstance: shoeInstance,
  });
});

exports.getShoeInstanceAdd = asyncHandler(async (req, res, next) => {
  res.render("shoeInstanceAdd", {
    title: "Add Shoe Instance",
  });
});

exports.postShoeInstanceAdd = [
  body("shoe", "What shoe is this").trim().isLength({ min: 1 }).escape(),
  body("stockNumber", "Should have stock number").escape(),
  body("status", "What is the status of this shoe").escape(),
  body("size", "What size is this shoe").escape(),
  asyncHandler(async (req, res, next) => {}),
];
