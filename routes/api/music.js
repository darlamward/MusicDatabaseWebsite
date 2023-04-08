const express = require("express");
const router = express.Router();
const musicDal = require("../../services/pg.music.dal");

router.get("/musicJson", async (req, res) => {
  try {
    let theMusic = await musicDal.getMusicJson();

    console.log(theMusic);
    res.json(theMusic);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving music data");
  }
});

router.get("/", async (req, res) => {
  try {
    let theMusic = await musicDal.getMusic();
    if (DEBUG) console.table(theMusic);
    res.render("music", { theMusic });
  } catch {
    res.render("503");
  }
});

router.get("/:id", async (req, res) => {
  try {
    let theMusic = await musicDal.getMusicItemByMusicId(req.params.id);
    if (theMusic.length === 0) res.render("norecord");
    else res.render("musicID", { theMusic });
  } catch {
    res.render("503");
  }
});

router.post("/", async (req, res) => {
  if (DEBUG) console.log("music.POST");
  try {
    await musicDal.addMusicItem(
      req.body.music_id,
      req.body.album_name,
      req.body.artist_name,
      req.body.type,
      req.body.price
    );
    res.redirect("/music/");
  } catch {
    res.render("503");
  }
});

router.get("/:id/replace", async (req, res) => {
  if (DEBUG) console.log("music.Replace : " + req.params.id);
  res.render("musicPut.ejs", {
    album_name: req.query.album_name,
    artist_name: req.query.artist_name,
    type: req.query.type,
    theId: req.params.id,
  });
});

router.get("/:id/delete", async (req, res) => {
  if (DEBUG) console.log("music.Delete : " + req.params.id);
  res.render("musicDelete.ejs", {
    album_name: req.query.album_name,
    artist_name: req.query.artist_name,
    type: req.query.type,
    theId: req.params.id,
  });
});

router.get("/:id/edit", async (req, res) => {
  if (DEBUG) console.log("music.Edit : " + req.params.id);
  res.render("musicPatch.ejs", {
    album_name: req.query.album_name,
    artist_name: req.query.artist_name,
    type: req.query.type,
    theId: req.params.id,
  });
});

router.put("/:id", async (req, res) => {
  if (DEBUG) console.log("music.PUT: " + req.params.id);
  try {
    await musicDal.putMusicItem(
      req.params.id,
      req.body.album_name,
      req.body.artist_name,
      req.body.type,
      req.body.price
    );
    res.redirect("/music/");
  } catch {
    res.render("503");
  }
});

router.patch("/:id", async (req, res) => {
  if (DEBUG) console.log("music.PATCH: " + req.params.id);
  try {
    await musicDal.patchMusicuItem(
      req.params.id,
      req.body.album_name,
      req.body.artist_name,
      req.body.type,
      req.body.price
    );
    res.redirect("/music/");
  } catch {
    res.render("503");
  }
});

router.delete("/:id", async (req, res) => {
  if (DEBUG) console.log("music.DELETE: " + req.params.id);
  try {
    await musicDal.deleteMusicItem(req.params.id);
    res.redirect("/music/");
  } catch {
    res.render("503");
  }
});

module.exports = router;
