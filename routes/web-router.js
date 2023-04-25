const express = require("express");
const db = require("./../../database/mongodb");
const router = express.Router();

router.get("/", async (req, res) => {
    const songs = await db.getSongs();

   res.render("home", { songs, page, totalPages });
 });

 router.get("/new-song", async (req, res) => {
    const artistsCollection = await getArtistsCollection();
    const artists = await artistsCollection.find().toArray();
    res.render("new-song", { artists });
  });

  router.post("/new-song", async (req, res) => {
    const newSong = {
      title: req.body.title,
      artist: req.body.artist,
      album: req.body.album,
      year: req.body.year,
      genre: req.body.genre,
      updatedAt: new Date(),
      createdAt: new Date(),
    };
    await db.insertSong(newSong);

    res.redirect("/");
  });
 
  router.get("/edit-song/:id", async (req, res) => {
    const id = req.params.id;
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).send("Invalid ID");
    }
  const song = await db.getSongById(id);
    const artistsCollection = await getArtistsCollection();
    const artists = await artistsCollection.find().toArray();

    res.render("edit-song", { song, artists });
  });

  router.get("/songs/:id", async (req, res) => {
    const id = req.params.id;
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).send("Invalid ID");
    }
    const objectId = new ObjectId(id);
    const collection = await getSongsCollection();
    const song = await collection.findOne({ _id: objectId });

    if (!song) {
      return res.status(404).send("Song not found");
    }

    res.render("song", { song });
  });

  router.post("/edit-song/:id", async (req, res) => {
    const artistId = req.body.artist;
    const isValidId = /^[0-9a-fA-F]{24}$/.test(artistId);
    if (!isValidId) {
      return res.status(400).send("Invalid artist id");
    }

    const updatedSong = {
      title: req.body.title,
      artist: new ObjectId(artistId),
      album: req.body.album,
      year: req.body.year,
      updatedAt: new Date(),
    };
    const id = req.params.id;
    await db.updateSongById(id, updatedSong);

    res.redirect("/");
  });

  router.post("/delete-song/:id", async (req, res) => {
    const id = req.params.id;

    await db.deleteSongById(id);

    res.redirect("/");
  });




module.exports = router;




