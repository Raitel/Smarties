const router = require('express').Router();
const mongoose = require('mongoose');
let Platform = require('../models/platform.model');

// return all platforms
router.route('/').get((req, res) => {
  Platform.find()
    .then(platforms => res.json(platforms))
    .catch(err => res.status(400).json('Error: ' + err));
});

//return all public platforms only
router.route('/getPublicPlatforms').get((req, res) => {
  Platform.find({'isPublic': true})
    .then(platforms => res.json(platforms))
    .catch(err => res.status(400).json('Error: ' + err));
});

// get platform by id
router.route('/:id').get((req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(406).send({status: false, message: ":id must be of ObjectId type"})
  }
  Platform.findById(req.params.id)
    .then(platform => res.json(platform))
    .catch(err => res.status(400).json('Error: ' + err));
});

// add platform
router.route('/add').post((req, res) => {
  if (!req.body.ownerid){
    res.status(406).send({status: false, message: "ownerid parameter required"})
  }
  if (!req.body.title){
    res.status(406).send({status: false, message: "title parameter required"})
  }
  const ownerid = req.body.ownerid;
  const title = req.body.title;

  const newPlatform = new Platform({
    ownerid,
    title
  });

  newPlatform.save()
    .then(platform => res.json(`Platform ${platform.id} added!`))
    .catch(err => res.status(400).json('Error: ' + err));
});

// set public
router.route('/set_public/:id').post((req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(406).send({status: false, message: ":id must be of ObjectId type"})
  }
  Platform.findById(req.params.id, function(err, retrievedPlatform){
    if (err){
      console.log(err);
      res.status(500).send()
    }else{
      if(!retrievedPlatform){res.status(404).send()} 
      else{
        retrievedPlatform.isPublic = true;
        retrievedPlatform.save(function(err, updatedPlatform) {
          if (err){
            console.log(err);
            res.status(500).send()
          }else{
            res.send(updatedPlatform)
          }
        })
      }
    }
  })
});

// set private
router.route('/set_private/:id').post((req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(406).send({status: false, message: ":id must be of ObjectId type"})
  }
  Platform.findById(req.params.id, function(err, retrievedPlatform){
    if (err){
      console.log(err);
      res.status(500).send()
    }else{
      if(!retrievedPlatform){res.status(404).send()} 
      else{
        retrievedPlatform.isPublic = false;
        retrievedPlatform.save(function(err, updatedPlatform) {
          if (err){
            console.log(err);
            res.status(500).send()
          }else{
            res.send(updatedPlatform)
          }
        })
      }
    }
  })
});

// upvote
router.route('/upvote/:id').post((req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(406).send({status: false, message: ":id must be of ObjectId type"})
  }
  Platform.findById(req.params.id, function(err, retrievedPlatform){
    if (err){
      console.log(err);
      res.status(500).send()
    }else{
      if(!retrievedPlatform){res.status(404).send()} 
      else{
        retrievedPlatform.upvotes = retrievedPlatform.upvotes + 1;
        retrievedPlatform.save(function(err, updatedPlatform) {
          if (err){
            console.log(err);
            res.status(500).send()
          }else{
            res.send(updatedPlatform)
          }
        })
      }
    }
  })
});

// remove upvote
router.route('/remove_upvote/:id').post((req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(406).send({status: false, message: ":id must be of ObjectId type"})
  }
  Platform.findById(req.params.id, function(err, retrievedPlatform){
    if (err){
      console.log(err);
      res.status(500).send()
    }else{
      if(!retrievedPlatform){res.status(404).send()} 
      else{
        if(retrievedPlatform.upvotes > 0){
          retrievedPlatform.upvotes = retrievedPlatform.upvotes - 1;
        }
        retrievedPlatform.save(function(err, updatedPlatform) {
          if (err){
            console.log(err);
            res.status(500).send()
          }else{
            res.send(updatedPlatform)
          }
        })
      }
    }
  })
});

// downvote
router.route('/downvote/:id').post((req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(406).send({status: false, message: ":id must be of ObjectId type"})
  }
  Platform.findById(req.params.id, function(err, retrievedPlatform){
    if (err){
      console.log(err);
      res.status(500).send()
    }else{
      if(!retrievedPlatform){res.status(404).send()} 
      else{
        retrievedPlatform.downvotes = retrievedPlatform.downvotes + 1;
        retrievedPlatform.save(function(err, updatedPlatform) {
          if (err){
            console.log(err);
            res.status(500).send()
          }else{
            res.send(updatedPlatform)
          }
        })
      }
    }
  })
});

// remove downvote
router.route('/remove_downvote/:id').post((req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(406).send({status: false, message: ":id must be of ObjectId type"})
  }
  Platform.findById(req.params.id, function(err, retrievedPlatform){
    if (err){
      console.log(err);
      res.status(500).send()
    }else{
      if(!retrievedPlatform){res.status(404).send()} 
      else{
        if(retrievedPlatform.downvotes > 0){
          retrievedPlatform.downvotes = retrievedPlatform.downvotes - 1;
        }
        retrievedPlatform.save(function(err, updatedPlatform) {
          if (err){
            console.log(err);
            res.status(500).send()
          }else{
            res.send(updatedPlatform)
          }
        })
      }
    }
  })
});

// update platform
router.route('/update/:id').post((req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(406).send({status: false, message: ":id must be of ObjectId type"})
  }
  Platform.findById(req.params.id, function(err, retrievedPlatform){
    if (err){
      console.log(err);
      res.status(500).send()
    }else{
      if(!retrievedPlatform){res.status(404).send()} 
      else{
        if(req.body.title){retrievedPlatform.title = req.body.title}
        if(req.body.description){retrievedPlatform.description = req.body.description}
        if(req.body.isPublic){retrievedPlatform.isPublic = req.body.isPublic}
        if(req.body.upvotes){retrievedPlatform.upvotes = req.body.upvotes}
        if(req.body.downvotes){retrievedPlatform.downvotes = req.body.downvotes}
        if(req.body.tags){retrievedPlatform.tags = req.body.tags}
        if(req.body.games){retrievedPlatform.games = req.body.games}
        retrievedPlatform.save(function(err, updatedPlatform) {
          if (err){
            console.log(err);
            res.status(500).send()
          }else{
            res.send(updatedPlatform)
          }
        })
      }
    }
  })
})

// delete platform
router.route('/:id').delete((req, res) => {
  Platform.findByIdAndDelete(req.params.id)
    .then(() => res.json('Platform deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;