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

exports.addGel = asyncHandler(async (req, res, next) => {
  res.render("gelAdd", {
    title: "Add Gel",
  });
});
