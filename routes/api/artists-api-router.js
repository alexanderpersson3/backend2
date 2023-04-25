const express = require('express');
const router = express.Router();

const db = require('./../../database/mongodb');

router.get('/', async (req, res) => {
    const artists = await db.getArtists();

    res.render('home', { artists });
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    const artist = await db.getArtistById(id);

    res.send(artist);
});

router.post('/', async (req, res) => {
    const newArtist = {
        artist: req.body.artist,
        updatedAt: new Date(),
        createdAt: new Date(),
    };

    await db.insertArtist(newArtist);

    res.redirect('/');
});

router.put('/:id', async (req, res) => {
    const updatedArtist = {
        
        artist: req.body.artist,
       
        year: req.body.year,
      
        updatedAt: new Date(),
        createdAt: new Date(),
    };
    const id = req.params.id;
    await db.updateArtistById(id, updatedArtist);

    res.send('PUT /artists');
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    await db.deleteArtistById(id);

    res.send('DELETE /artists');
});
// GET: artists/:id/songs -> return all songs by an artist with ID
router.get('/:id/songs', async (req, res) => {
    const id = req.params.id;
    const songs = await db.getSongsByArtistId(id);
    res.send(songs);
});
module.exports = router;






// const db = require('./../../database');

// router.get('/', async (req, res) => {
//     const people = await db.getPeople();
    
//     res.send(people)
// })

// router.get('/', async (req, res) => {
//     const id = req.params.id;
//     const person = await db.getPeople();
 
//     res.send(person);
//  })

// router.post('/', async (req, res) => {
//     const newPerson = {
//         name: req.body.name,
//         birthYear: req.body.birthYear
     

//     };

//     await db.insertPerson(newPerson);
//     res.sendStatus(201); // betyder att vi har skapat en ny resurs
// });

// router.put('/:id', async (req, res) => {
//     const updatedPerson = {
//         name: req.body.name,
//         birthYear: req.body.birthYear
//     }
//     const id = req.params.id;
//     await db.updatePersonById(id, updatedPerson)

//     res.sendStatus(200);
// });

// router.delete('/:id', async (req, res) => {
//     const id = req.params.id;

//     await db.deletePersonById(id);

//     res.sendStatus(200);
// });
// router.get('/:id/cars', async (req, res) => {
//     const id = req.params.id;
//     const cars = await db.getCarsByOwnerId(id);
//     res.send(cars);
// });

// // GET: people/:id/cars -> return all cars owned by a person with ID
// module.exports = router;