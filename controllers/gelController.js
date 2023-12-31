const Gel = require("../models/gel");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.gelsList = asyncHandler(async (req, res, next) => {
  const allGels = await Gel.find().exec();
  res.render("gelsList", {
    title: "Gels",
    gelsList: allGels,
  });
});

exports.gelDetail = asyncHandler(async (req, res, next) => {
  const gel = await Gel.findById(req.params.id).exec();
  if (gel == null) {
    const err = new Error("Gel not found");
    err.status = 404;
    return next(err);
  }
  res.render("gelDetails", {
    title: "Gel: ",
    gel: gel,
  });
});

exports.gelDelete = asyncHandler(async (req, res, next) => {
  const gel = await Gel.findById(req.params.id).exec();
  if (gel == null) {
    const err = new Error("Gel not found");
    err.status = 404;
    return next(err);
  }
  res.render("gelDelete", {
    title: "Delete Gel",
    gel: gel,
  });
});

exports.gelDeletePost = asyncHandler(async (req, res, next) => {
  const gel = await Gel.findById(req.body.gelID).exec();
  await Gel.deleteOne(gel._id);

  res.redirect("/products/gels");
});

exports.gelUpdate = asyncHandler(async (req, res, next) => {
  const gel = await Gel.findById(req.params.id);

  res.render("gelAdd", {
    title: "Update Gel",
    gel: gel,
  });
});

exports.gelUpdatePost = [
  body("brand", "Gels should have a brand")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Gel should have a price").escape(),
  body("caffeineAmount", "Enter the amount of caffeine this gel has").escape(),
  body("flavor", "Enter the flavor of this gel")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const gel = new Gel({
      brand: req.body.brand,
      price: req.body.price,
      caffeineAmount: req.body.caffeineAmount,
      flavor: req.body.flavor,
      _id: req.params.id,
    });
    if (!errors.isEmpty()) {
      res.render("gelAdd", {
        title: "Update Gel",
        gel: gel,
        errors: errors.array(),
      });
      return;
    } else {
      const updatedGel = await Gel.findOneAndUpdate(
        { _id: req.params.id },
        gel,
        {}
      );
      res.redirect(updatedGel.url);
    }
  }),
];

exports.addGel = asyncHandler(async (req, res, next) => {
  res.render("gelAdd", {
    title: "Add Gel",
  });
});

exports.addGelPost = [
  body("brand", "Gels should have a brand")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Gel should have a price").escape(),
  body("caffeineAmount", "Enter the amount of caffeine this gel has").escape(),
  body("flavor", "Enter the flavor of this gel")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const gel = new Gel({
      brand: req.body.brand,
      price: req.body.price,
      caffeineAmount: req.body.caffeineAmount,
      flavor: req.body.flavor,
    });
    if (!errors.isEmpty()) {
      res.render("gelAdd", {
        title: "Add Gel",
        gel: gel,
        errors: errors.array(),
      });
      return;
    } else {
      await gel.save();
      res.redirect(gel.url);
    }
  }),
];
