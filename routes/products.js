const express = require("express");
const router = express.Router();
const gelController = require("../controllers/gelController");

router.get("/", (req, res, next) => {
  res.render("index", { title: "Runner's Inventory" });
});

router.get("/gels", gelController.gelsList);
router.get("/gel/:id", gelController.gelDetail);
router.get("/gel/:id/delete", gelController.gelDelete);
router.get("/gels/add", gelController.addGel);

router.post("/gel/:id/delete", gelController.gelDeletePost);
router.post("/gels/add", gelController.addGelPost);

module.exports = router;
