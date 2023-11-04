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
