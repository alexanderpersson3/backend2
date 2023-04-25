const express = require("express");
const exphbs = require("express-handlebars");

const bodyParser = require("body-parser");
require("dotenv").config();

(async () => {

  const client = new MongoClient(connectionUrl);

  await client.connect();

  const webRouter = require("./routes/web");
  const songsApiRouter = require('./routes/api/songs-api-router');
  const artistsApiRouter = require('/routes/api/artists-api-router');
  const app = express();
  
  app.engine(
    "hbs",
    exphbs.engine({
      defaultLayout: "main",
      extname: ".hbs",
    })
  );

  app.set("view engine", "hbs");

  app.use(express.static("public"));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use("/", webRouter);
  app.use("/api/songs", songsApiRouter);
  app.use("/api/artists", artistsApiRouter);

  app.listen(8000, () => {
    console.log("http://localhost:8000/");
  });
})();
