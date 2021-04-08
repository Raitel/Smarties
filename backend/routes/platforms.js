const router = require('express').Router();
let Platform = require('../models/platform.model');

router.route('/').get((req, res) => {
  Platform.find()
    .then(platforms => res.json(platforms))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Platform.findById(req.params.id)
    .then(platform => res.json(platform))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
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

router.route('/:id').delete((req, res) => {
  Platform.findByIdAndDelete(req.params.id)
    .then(() => res.json('Platform deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/set_public/:id').post((req, res) => {
  Platform.findById(req.params.id, function(err, retrievedPlatform){
    if (err){
      console.log(err);
      res.status(500).send()
    }else{
      if(!retrievedPlatform){res.status(404).send()} 
      else{
        retrievedPlatform.visibility = "PUBLIC";
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

router.route('/set_private/:id').post((req, res) => {
  Platform.findById(req.params.id, function(err, retrievedPlatform){
    if (err){
      console.log(err);
      res.status(500).send()
    }else{
      if(!retrievedPlatform){res.status(404).send()} 
      else{
        retrievedPlatform.visibility = "PRIVATE";
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

router.route('/upvote/:id').post((req, res) => {
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

router.route('/remove_upvote/:id').post((req, res) => {
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

router.route('/downvote/:id').post((req, res) => {
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

router.route('/remove_downvote/:id').post((req, res) => {
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

router.route('/update/:id').post((req, res) => {
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

module.exports = router;