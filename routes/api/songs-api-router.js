 const express = require("express");
 const { ObjectId } = require("mongodb");
const router = express.Router();

const db = require('./../../database/mongodb');
const { ObjectId } = require("mongodb");

router.get('/', async (req, res) => {
   const songs = await db.getSongs();

   res.send(songs);

});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    const song = await db.getSongById(id);

    res.send(song);
});

router.post('/', async (req, res) => {
    const newSong = {
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        year: req.body.year,
        genre: req.body.genre,
        artistId: new ObjectId(req.body.artistId),
        updatedAt: new Date(),
        createdAt: new Date(),
    };

    await db.insertSong(newSong);

    res.redirect('/');
});

router.put('/:id', async (req, res) => {
    const updatedSong = {
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        year: req.body.year,
        genre: req.body.genre,
        artistId: new ObjectId(req.body.artistId),
        updatedAt: new Date(),
        createdAt: new Date(),
    };
    const id = req.params.id;
    await db.updateSongById(id, updatedSong);

    res.send('PUT /songs');
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    await db.deleteSongById(id);

    res.send('DELETE /songs');
});

module.exports = router;

// router.get("/", async (req, res) => {
//     const songs = await db.getSongs();

//    res.render("home", { songs, page, totalPages });
//  });




// module.exports = router;



















// const express = require("express");
// const { ObjectId } = require("mongodb");
// const router = express.Router();

// const db = require('./../../database/mongodb');


// router.get('/', async (req, res) => {
//     const id = req.params.id;
//    const car = await db.getCars();

//    res.send(cars);
// })

// router.get('/id', async (req, res) => {
//     const id = req.params.id;
//     const car = await db.getCarById(id);

//     res.send(car);
// });

// router.post('/', async (req, res) => {
//     const newCar = {
//         make: req.body.make,
//         model: req.body.model,
//         ownerId: new ObjectId(req.body.ownerId),
//         year: req.body.year,
//         price: req.body.price,
//         color: req.body.color,
//         isSold: false

//     };

//     await db.insertCar(car);
//     res.sendStatus(201); // betyder att vi har skapat en ny resurs
// });

// router.put('/:id', async (req, res) => {
//     const updatedCar = {
//         make: req.body.make,
//         model: req.body.model,
//         ownerId: new ObjectId(req.body.ownerId),
//         year: req.body.year,
//         price: req.body.price,
//         color: req.body.color,
//         isSold: false
//     }
//     const id = req.params.id;
//     await db.updateCarById(id, updatedCar)

//     res.sendStatus(200);
// });

// router.delete('/:id', async (req, res) => {
//     const id = req.params.id;

//     await db.deleteCarById(id);

//     res.sendStatus(200);
// });

// module.exports = router