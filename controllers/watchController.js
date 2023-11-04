const Watch = require("../models/watch");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.getWatchList = asyncHandler(async (req, res, next) => {
  const allWatches = await Watch.find({}).exec();
  res.render("watchList", {
    title: "Watch Products",
    watches: allWatches,
  });
});

exports.getWatchDetails = asyncHandler(async (req, res, next) => {
  const watch = await Watch.findById(req.params.id).exec();

  res.render("watchDetails", {
    title: "Watch: ",
    watch: watch,
  });
});

exports.getWatchDelete = asyncHandler(async (req, res, next) => {
  const watch = await Watch.findById(req.params.id).exec();
  if (watch === null) {
    const err = new Error("Watch doesn't exist");
    err.status = 404;
    return next(err);
  } else {
    res.render("watchDelete", {
      title: "Delete Watch",
      watch: watch,
    });
  }
});