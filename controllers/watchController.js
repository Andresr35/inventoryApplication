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

exports.getWatchAdd = asyncHandler(async (req, res, next) => {
  res.render("watchAdd", {
    title: "Add Watch",
  });
});

exports.getWatchUpdate = asyncHandler(async (req, res, next) => {
  const watch = await Watch.findById(req.params.id);

  res.render("watchAdd", {
    title: "Update Watch",
    watch: watch,
  });
});

exports.postWatchDelete = asyncHandler(async (req, res, next) => {
  const watch = await Watch.findById(req.params.id);

  await Watch.deleteOne(watch._id);
  res.redirect("/products/watches");
});

exports.postWatchAdd = [
  body("brand", "Watch should have a brand")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Watch should have a price").escape(),
  body("model", "Enter the model of the watch")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "Enter a description of the watch")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const watch = new Watch({
      brand: req.body.brand,
      price: req.body.price,
      model: req.body.model,
      description: req.body.description,
    });
    if (!errors.isEmpty()) {
      res.render("watchAdd", {
        title: "Add Watch",
        watch: watch,
        errors: errors.array(),
      });
    } else {
      await watch.save();
      res.redirect(watch.url);
    }
  }),
];

exports.postWatchUpdate = [
  body("brand", "Watch should have a brand")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Watch should have a price").escape(),
  body("model", "Enter the model of the watch")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "Enter a description of the watch")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const watch = new Watch({
      brand: req.body.brand,
      price: req.body.price,
      model: req.body.model,
      description: req.body.description,
      _id: req.params.id,
    });
    if (!errors.isEmpty()) {
      res.render("watchAdd", {
        title: "Add Watch",
        watch: watch,
        errors: errors.array(),
      });
      return;
    } else {
      const updatedWatch = await Watch.findOneAndUpdate(
        { _id: req.params.id },
        watch,
        {}
      );

      res.redirect(updatedWatch.url);
    }
  }),
];
