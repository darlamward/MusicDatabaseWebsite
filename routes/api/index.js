var router = require("express").Router();

if (DEBUG) {
  console.log("ROUTE: /api/music");
}

const musicRouter = require("./music");
router.use("/music", musicRouter);

module.exports = router;
