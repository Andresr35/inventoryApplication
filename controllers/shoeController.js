const Shoe = require("../models/shoe");
const ShoeInstance = require("../models/shoeInstance");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.getShoeList = asyncHandler(async (req, res, next) => {
  const allShoes = await Shoe.find({}).exec();
  res.render("shoeList", {
    title: "Shoe List",
    shoes: allShoes,
  });
});

exports.getShoeDetails = asyncHandler(async (req, res, next) => {
  const [shoe, shoeInstances] = await Promise.all([
    Shoe.findById(req.params.id).exec(),
    ShoeInstance.find({ shoe: req.params.id }).exec(),
  ]);

  res.render("shoeDetails", {
    title: "Shoe Details",
    shoe: shoe,
    shoeInstances: shoeInstances,
  });
});

exports.getShoeAdd = asyncHandler(async (req, res, next) => {
  res.render("shoeAdd", {
    title: "Add Shoe",
  });
});

exports.getShoeUpdate = asyncHandler(async (req, res, next) => {
  const shoe = await Shoe.findById(req.params.id).exec();
  res.render("shoeAdd", {
    title: "Update Shoe",
    shoe: shoe,
  });
});

exports.getShoeDelete = asyncHandler(async (req, res, next) => {
  const shoe = await Shoe.findById(req.params.id).exec();

  res.render("shoeDelete", {
    title: "Delete Shoe",
    shoe: shoe,
  });
});

exports.postShoeDelete = asyncHandler(async (req, res, next) => {
  const [shoe, shoeInstances] = await Promise.all([
    Shoe.findById(req.params.id).exec(),
    ShoeInstance.find({ shoe: req.params.id }).exec(),
  ]);
  if (shoeInstances > 0) {
    res.render("shoeDelete", {
      title: "Delete Shoe",
      shoe: shoe,
      shoeInstances,
      shoeInstances,
    });
    return;
  } else {
    await Shoe.deleteOne({ _id: req.params.id });
    res.redirect("/products/shoes");
  }
});

exports.postShoeUpdate = [
  body("name", "What shoe is this").trim().isLength({ min: 1 }).escape(),
  body("gender", "What gender is this for?")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category", "What type of shoe is this")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "What price is this shoe").escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const shoe = new Shoe({
      name: req.body.name,
      gender: req.body.gender,
      category: req.body.category,
      price: req.body.price,
      _id: req.params.id,
    });
    if (!errors.isEmpty()) {
      res.render("shoeAdd", {
        title: "Update Shoe",
        shoe: shoe,
        errors: errors,
      });
      return;
    } else {
      const updatedShoe = await Shoe.findOneAndUpdate(
        { _id: req.params.id },
        shoe,
        {}
      );
      res.redirect(updatedShoe.url);
    }
  }),
];

exports.postShoeAdd = [
  body("name", "What shoe is this").trim().isLength({ min: 1 }).escape(),
  body("gender", "What gender is this for?")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category", "What type of shoe is this")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "What price is this shoe").escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const shoe = new Shoe({
      name: req.body.name,
      gender: req.body.gender,
      category: req.body.category,
      price: req.body.price,
    });
    if (!errors.isEmpty()) {
      res.render("shoeAdd", {
        title: "Add shoe",
        shoe: shoe,
        errors: errors.array(),
      });
    } else {
      await shoe.save();
      res.redirect(shoe.url);
    }
  }),
];
