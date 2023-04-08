const express = require("express");
const methodOverride = require("method-override");
const app = express();
const PORT = 3000;

global.DEBUG = true;
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("index.ejs", { name: "for Adding/Editing/Deleting Music Items" });
});

app.get("/musicJson", (request, response) => {
  response.render("musicJson.ejs");
});

const musicRouter = require("./routes/api/music");
app.use("/music", musicRouter);

const apiRouter = require("./routes/api");
app.use("/api", apiRouter);

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Simple app running on port ${PORT}.`);
});
