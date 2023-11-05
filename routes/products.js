const express = require("express");
const router = express.Router();

const gelController = require("../controllers/gelController");
const watchController = require("../controllers/watchController");
const shoeInstanceController = require("../controllers/shoeInstanceController");

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

//----Watches------------------
router.get("/watches", watchController.getWatchList);
router.get("/watch/add", watchController.getWatchAdd);
router.get("/watch/:id", watchController.getWatchDetails);
router.get("/watch/:id/delete", watchController.getWatchDelete);
router.get("/watch/:id/update", watchController.getWatchUpdate);

router.post("/watch/:id/delete", watchController.postWatchDelete);
router.post("/watch/:id/update", watchController.postWatchUpdate);
router.post("/watch/add", watchController.postWatchAdd);

//----Shoe Instances------------------
router.get("/shoeInstances", shoeInstanceController.getShoeInstanceList);
module.exports = router;
