const express = require("express");
const router = express.Router();

const gelController = require("../controllers/gelController");
const watchController = require("../controllers/watchController");
const shoeController = require("../controllers/shoeController");
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
router.get("/shoeInstance/:id", shoeInstanceController.getShoeInstanceDetails);
router.get(
  "/shoeInstance/:id/delete",
  shoeInstanceController.getShoeInstanceDelete
);
router.get(
  "/shoeInstance/:id/update",
  shoeInstanceController.getShoeInstanceUpdate
);
router.get("/shoeInstances/add", shoeInstanceController.getShoeInstanceAdd);

router.post("/shoeInstances/add", shoeInstanceController.postShoeInstanceAdd);
router.post(
  "/shoeInstance/:id/delete",
  shoeInstanceController.postShoeInstanceDelete
);
router.post(
  "/shoeInstance/:id/update",
  shoeInstanceController.postShoeInstanceUpdate
);

//----Shoes------------------
router.get("/shoes", shoeController.getShoeList);
router.get("/shoe/:id", shoeController.getShoeDetails);
router.get("/shoe/:id/delete", shoeController.getShoeDelete);
router.get("/shoes/add", shoeController.getShoeAdd);
router.get("/shoe/:id/update", shoeController.getShoeUpdate);

router.post("/shoes/add", shoeController.postShoeAdd);
router.post("/shoe/:id/update", shoeController.postShoeUpdate);
router.post("/shoe/:id/delete", shoeController.postShoeDelete);

module.exports = router;
