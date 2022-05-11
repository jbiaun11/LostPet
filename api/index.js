var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var response = require('./response');

// parse request body into js object
app.use(express.json());

var database;


// REQUEST BODY: { description, completed, deleted }
app.post('/addPet', function(req, res){
  const pet = {
    type: req.body.type,
    state: req.body.state,
    status: req.body.status,
    name: req.body.name,
    age: req.body.age,
    imageUrl: req.body.imageUrl
  }

  if(!pet.type) {
    res.status(400);
    res.send(response.error('Type is required.'));
    return;
  }

  if(!pet.state) {
    res.status(400);
    res.send(response.error('State is required.'));
    return;
  }

  if(!pet.status) {
    res.status(400);
    res.send(response.error('Status is required.'));
    return;
  }

  if(!pet.name) {
    res.status(400);
    res.send(response.error('Name is required.'));
    return;
  }

  if(!pet.age) {
    res.status(400);
    res.send(response.error('Age is required.'));
    return;
  }

  if(!pet.imageUrl) {
    res.status(400);
    res.send(response.error('ImageUrl is required.'));
    return;
  }

  database.collection('pet').insertOne(pet, function(err, result){
    if(err) {
      res.status(500);
      res.send(response.error('There was an error inserting the document.'));
      return;
    }

    database.collection('pet').findOne({ _id: ObjectId(result.insertedId)}, function(err, result) {
      if(err) {
        res.status(500);
        res.send(response.error('There was an error getting the inserted document.'));
        return;
      }

      return res.send(response.success(result));
    })
  });

});

// PARAMS: None
app.get('/getAllPets', function(req, res){
  database.collection('pet').find().toArray(function(err, result){
    if(err){
      res.status(500);
      res.send(response.error('There was an error finding the pets.'));
      return;
    }

    res.send(response.success(result));
  })
});

app.post('/getPetsByStatus', function(req, res){
  database.collection('pet').find({ status: req.body.status}).toArray(function(err, result){
    if(err){
      res.status(500);
      res.send(response.error('There was an error finding the pets.'));
      return;
    }

    res.send(response.success(result));
  })
});

app.post('/getPetsByState', function(req, res){
    database.collection('pet').find({state: req.body.state}).toArray(function(err, result){
      if(err){
        res.status(500);
        res.send(response.error('There was an error finding the pets.'));
        return;
      }
  
      res.send(response.success(result));
    })
  });

// REQUEST BODY: { _id }
app.post('/deletePet', function(req, res){
  if(!ObjectId.isValid(req.body._id)){
    res.status(400);
    res.send(response.error('A valid _id is required.'));
    return;
  }


  database.collection('pet').deleteOne({_id: ObjectId(req.body._id)}, function(err, result){
    if(err){
      res.status(500);
      res.send(response.error('There was an error marking the pet as deleted.'));
      return;
    }

    if (result.deletedCount === 0){
      res.status(400);
      res.send(response.error('Pet not found.'));
      return;
    }

    res.send(response.success({deletedCount: result.deletedCount}));
  });
});

// REQUEST BODY: { _id }
app.post('/updatePet', function(req, res){
  if(!ObjectId.isValid(req.body._id)){
    res.status(400);
    res.send(response.error('A valid _id is required.'));  
    return;
  }


  database.collection('pet').updateOne({_id: ObjectId(req.body._id)}, { $set:{status: "Found"}}, function(err, result){
    if(err){
      res.status(500);
      res.send(response.error('There was an error updating the pet status.'));
      return;
    }

    res.send(response.success({modifiedCount: result.modifiedCount}));
  });
});

app.listen(8080, function() {
  MongoClient.connect('mongodb://localhost:27017', {useUnifiedTopology: true}, function(err, client){
    if(err) throw err;

    database = client.db('biauniepetapi');
  });
});
