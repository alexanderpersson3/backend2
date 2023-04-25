const { MongoClient, ObjectId } = require('mongodb')

const connectionUrl = process.env.CONNECTION_URL;

const client = new MongoClient(connectionUrl);

const dbName = "SongsCrudApp";

/* ------------- SONGS ------------- */

async function getSongsCollection() {
    const db = client.db(dbName);
    const collection = db.collection("songs");
    return collection;
  }


module.exports.getSongs = async () => {
    const page = parseInt(req.query.page) || 1;
    const perPage = 5;
    const collection = await getSongsCollection();
    const totalSongs = await collection.countDocuments();
    const totalPages = Math.ceil(totalSongs / perPage);
    const songs = await collection
      .find()
      .sort({ updatedAt: -1, createdAt: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .toArray();

      return findResult;
}

module.exports.insertSong = async (newSong) => {
    const collection = await getSongsCollection();

    await collection.insertOne(newSong);
}

module.exports.getSongById = async (id) => {
    const objectId = new ObjectId(id);
    const collection = await getSongsCollection();
    const song = await collection.findOne({ _id: objectId });
    const artistsCollection = await getArtistsCollection();
    const artists = await artistsCollection.find().toArray();

    return { song, artists };
}

module.exports.updateSongById = async (id, updatedSong) => {
    const id = req.params.id;
    const objectId = new ObjectId(id);
    const collection = await getSongsCollection();
    const song = await collection.updateOne(
      { _id: objectId },
      { $set: updatedSong }
    );
}

module.exports.deleteSongById = async (id) => {
  
    const objectId = new ObjectId(id);
    const collection = await getSongsCollection();
    await collection.deleteOne({ _id: objectId })
}


module.exports.getSongsByArtistId = async (artistId) => {
    const objectId = new ObjectId(artistId);
    const page = parseInt(req.query.page) || 1;
    const perPage = 5;
    const collection = await getSongsCollection();
    const totalSongs = await collection.countDocuments();
    const totalPages = Math.ceil(totalSongs / perPage);
    const songs = await collection
      .find({ownerId: objectId})
      .sort({ updatedAt: -1, createdAt: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .toArray();

      return findResult;
};

/* ------------- /SONGS ------------- */


/* ------------- ARTISTS ------------- */

async function getArtistsCollection() {
    const db = client.db(dbName);
    const collection = db.collection("artists");
    return collection;
  }

  module.exports.getArtists = async () => {
    const page = parseInt(req.query.page) || 1;
    const perPage = 5;
    const collection = await getArtistsCollection();
    const totalSongs = await collection.countDocuments();
    const totalPages = Math.ceil(totalSongs / perPage);
    const songs = await collection
      .find()
      .sort({ updatedAt: -1, createdAt: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .toArray();

      return findResult;
}

  module.exports.insertArtist = async (newArtist) => {
    const collection = await getArtistsCollection();

    await collection.insertOne(newArtist); 
  }

  module.exports.getArtistById = async (id) => {
    const objectId = new ObjectId(id);
    const collection = await getArtistsCollection();
    const song = await collection.findOne({ _id: objectId });
    const artistsCollection = await getArtistsCollection();
    const artists = await artistsCollection.find().toArray();

    return { song, artists };
}


module.exports.updateArtistById = async (id, updatedArtist) => {
    const id = req.params.id;
    const objectId = new ObjectId(id);
    const collection = await getArtistsCollection();
    const song = await collection.updateOne(
      { _id: objectId },
      { $set: updatedArtist }
    );
}

module.exports.deleteArtistById = async (id) => {
  
    const objectId = new ObjectId(id);
    const collection = await getArtistsCollection();
    await collection.deleteOne({ _id: objectId })
}







/* ------------- /ARTISTS ------------- */
// const { MongoClient, ObjectId} = require('mongodb')//skapa en funktion för att hämta cars



// const connectionURL = 'process.env.MONGODB_URI';
// const client = new MongoClient(connectionURL);

// const dbName = "process.env.MONGODB_DATABASE";


// /* ---------------cars ----------  */
// async function getCarsCollection(){
//     await client.connect();
//     const db = client.db(dbName);
//     const collection = db.collection("cars");
//     return collection;
// }
// // allt ovanför är för att prata med databasen

// module.exports.getCars = async () => {
//     const collection = await getCarsCollection(); 
//     const findResult = await collection.find({}).toArray();

//     return findResult; //måste göra något med funktionerna ovanför
// }

// module.exports.insertCar = async (newCar) => {
//     const collection = await getCarsCollection();
//     const result = await collection.insertOne(newCar);
//     return result;
// }

// module.exports.getCarById = async (id) => {
//     const objectId = new ObjectId(id);
//     const collection = await getCarsCollection(); // this is for adding a new car

// const car = collection.findOne({_id: ObjectId});
// return car;
// }

// module.exports.updateCarById = async (id, updatedCar) => {
//     const objectId = new ObjectId(id);
//     const collection = await getCarsCollection(); // this is for adding a new car

// await collection.updateOne({_id: ObjectId}, {$set: updatedCar});
// }

// module.exports.deleteCarById = async (id) => {
//     const objectId = new ObjectId(id);
//     const collection = await getCarsCollection(); // this is for adding a new car
//     await collection.deleteOne({_id: ObjectId});

// }
// module.exports.getCarsByOwnerId = async (ownerId) => {
// const objectId = new ObjectId(ownerId);
// const collection = await getCarsCollection(); 
//     const findResult = await collection.find({ownerId: objectId}).toArray();

//     return findResult; //måste göra något med funktionerna ovanför
// };
// /* ---------------/cars ----------  */

// /* ---------------PEOPLE ----------  */
// async function getPeopleCollection(){
//     await client.connect();
//     const db = client.db(dbName);
//     const collection = db.collection("people");
//     return collection;
// }


// module.exports.getPeople = async () => {
//     const collection = await getPeopleCollection(); 
//     const findResult = await collection.find({}).toArray();

//     return findResult; //måste göra något med funktionerna ovanför
// }

// module.exports.getPersonById = async (id) => {
//     const objectId = new ObjectId(id);
//     const collection = await getPeopleCollection(); // this is for adding a new car

// const person = collection.findOne({_id: ObjectId});
// return person;
// }

// module.exports.insertPerson = async (newPerson) => {
//     const collection = await getPeopleCollection();
//     const result = await collection.insertOne(newPerson);
//     return result;
// }

// module.exports.updatePersonById = async (id, updatedPerson) => {
//     const objectId = new ObjectId(id);
//     const collection = await getPeopleCollection(); // this is for adding a new car

// await collection.updateOne({_id: ObjectId}, {$set: updatedPerson});
// }

// module.exports.deletePersonById = async (id) => {
//     const objectId = new ObjectId(id);
//     const collection = await getPeopleCollection(); // this is for adding a new car
//     await collection.deleteOne({_id: ObjectId});

// }

// /* ---------------/PEOPLE ----------  */