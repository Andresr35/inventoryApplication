const ShoeInstance = require("../models/shoeInstance");
const Shoe = require("../models/shoe");
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
  const shoeInstance = await ShoeInstance.findById(req.params.id)
    .populate("shoe")
    .exec();
  res.render("shoeInstanceDetails", {
    title: "Shoe Instance Details",
    shoeInstance: shoeInstance,
  });
});

exports.getShoeInstanceAdd = asyncHandler(async (req, res, next) => {
  const shoes = await Shoe.find({}).exec();
  res.render("shoeInstanceAdd", {
    title: "Add Shoe Instance",
    shoes: shoes,
  });
});

exports.getShoeInstanceDelete = asyncHandler(async (req, res, next) => {
  const shoeInstance = await ShoeInstance.findById(req.params.id)
    .populate("shoe")
    .exec();
  console.log(shoeInstance);
  res.render("shoeInstanceDelete", {
    title: "Delete Shoe Instance",
    shoeInstance: shoeInstance,
  });
});

exports.getShoeInstanceUpdate = asyncHandler(async (req, res, next) => {
  const [shoeInstance, shoes] = await Promise.all([
    ShoeInstance.findById(req.params.id).populate("shoe").exec(),
    Shoe.find({}).exec(),
  ]);

  res.render("shoeInstanceAdd", {
    title: "Add Shoe Instance",
    shoes: shoes,
    shoeInstance: shoeInstance,
  });
});

exports.postShoeInstanceAdd = [
  body("shoe", "What shoe is this").trim().isLength({ min: 1 }).escape(),
  body("stockNumber", "Should have stock number").escape(),
  body("status", "What is the status of this shoe").escape(),
  body("size", "What size is this shoe").escape(),
  asyncHandler(async (req, res, next) => {
    const shoes = await Shoe.find({});
    const errors = validationResult(req);
    const shoeInstance = new ShoeInstance({
      shoe: req.body.shoe,
      stockNumber: req.body.stockNumber,
      status: req.body.status,
      size: req.body.size,
    });
    if (!errors.isEmpty()) {
      res.render("shoeInstanceAdd", {
        title: "Add Shoe Instance",
        shoeInstance: shoeInstance,
        shoes: shoes,
        errors: errors.array(),
      });
    } else {
      await shoeInstance.save();
      res.redirect(shoeInstance.url);
    }
  }),
];

exports.postShoeInstanceUpdate = [
  body("shoe", "What shoe is this").trim().isLength({ min: 1 }).escape(),
  body("stockNumber", "Should have stock number").escape(),
  body("status", "What is the status of this shoe").escape(),
  body("size", "What size is this shoe").escape(),
  asyncHandler(async (req, res, next) => {
    const shoes = await Shoe.find({});
    const errors = validationResult(req);
    const shoeInstance = new ShoeInstance({
      shoe: req.body.shoe,
      stockNumber: req.body.stockNumber,
      status: req.body.status,
      size: req.body.size,
      _id: req.params.id,
    });
    if (!errors.isEmpty()) {
      res.render("shoeInstanceAdd", {
        title: "Add Shoe Instance",
        shoeInstance: shoeInstance,
        shoes: shoes,
        errors: errors.array(),
      });
    } else {
      const updatedShoeInstace = await ShoeInstance.findOneAndUpdate(
        { _id: req.params.id },
        shoeInstance,
        {}
      );
      res.redirect(updatedShoeInstace.url);
    }
  }),
];

exports.postShoeInstanceDelete = asyncHandler(async (req, res, next) => {
  const shoeInstance = await ShoeInstance.findById(req.params.id).exec();

  await shoeInstance.deleteOne(shoeInstance._id);
  res.redirect("/products/shoeInstances");
});
