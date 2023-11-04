const express = require("express");
const router = express.Router();
const gelController = require("../controllers/gelController");

router.get("/", (req, res, next) => {
  res.render("index", { title: "Runner's Inventory" });
});

//----GELS------------------
router.get("/gels", gelController.gelsList);
router.get("/gels/add", gelController.addGel);
router.get("/gel/:id", gelController.gelDetail);
router.get("/gel/:id/delete", gelController.gelDelete);
router.get("/gel/:id/update", gelController.gelUpdate);

router.post("/gel/:id/delete", gelController.gelDeletePost);
router.post("/gels/add", gelController.addGelPost);
router.post("/gel/:id/update", gelController.gelUpdatePost);

module.exports = router;
