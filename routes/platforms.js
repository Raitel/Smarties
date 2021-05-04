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

router.route('/getRandomPlatforms').get((req, res) => {
  Platform.aggregate([
    {$match: {isPublic: true}},
    {$sample: {size: 12}}
  ])
    .then(platforms => res.json(platforms))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getRecentlyUpdatedPlatforms').get((req, res) => {
  Platform.find({'isPublic': true}).sort({'updatedAt':-1}).limit(12)
    .then(platforms => res.json(platforms))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getMostUpvotedPlatforms').get((req, res) => {
  Platform.aggregate([{$match: {isPublic: true}}]).sort('Upvotes').limit(12)
    .then(platforms => res.json(platforms))
    .catch(err => res.status(400).json('Error: ' + err));
});

// get platforms by keyword
// router.route('/getPlatformsByKeyword/:keyword').get((req, res) => {
//   Platform.find({
//     $and: [
//         { 'isPublic': true },
//         { $or: [{"title" : new RegExp(req.params.keyword,'i')}, {"description" : new RegExp(req.params.keyword,'i')}, {"tags" : new RegExp(req.params.keyword,'i')}] }
//     ]
// })
//     .then(platforms => res.json(platforms))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

router.route('/getPlatformsByKeywordAll/:keyword').get((req, res) => {
  var keywords = req.params.keyword;
  var keywords_regular_expression = new RegExp(keywords, "i");
  var check = []

  if(req.params.keyword.includes('&')){
    keywords = req.params.keyword.split('&');
    //keywords_regular_expression = new RegExp(keywords.join("|"), "i");
    if(keywords.length > 1){
      for(var i = 0; i < keywords.length; i++){
        keywords_regular_expression = new RegExp(keywords[i], "i");
        check.push({ $or: [{"title" : keywords_regular_expression}, {"description" : keywords_regular_expression}, {"tags" : keywords_regular_expression}] })
      }
    }

  }
  else{
    check.push({ $or: [{"title" : keywords_regular_expression}, {"description" : keywords_regular_expression}, {"tags" : keywords_regular_expression}] })
  }
  

  Platform.find({
  //   $and: [
  //     { 'isPublic': true },
  //     { $or: [{"title" : keywords_regular_expression}, {"description" : keywords_regular_expression}, {"tags" : keywords_regular_expression}] }
  // ]
     $and: [
      { 'isPublic': true },
      { $and: check }
  ]
})
    .then(platforms => res.json(platforms))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getPlatformsByKeyword/:page/:keyword').get((req, res) => {
  var keywords = req.params.keyword;
  var keywords_regular_expression = new RegExp(keywords, "i");
  var check = []

  if(req.params.keyword.includes('&')){
    keywords = req.params.keyword.split('&');

    if(keywords.length > 1){
      for(var i = 0; i < keywords.length; i++){
        keywords_regular_expression = new RegExp(keywords[i], "i");
        check.push({ $or: [{"title" : keywords_regular_expression}, {"description" : keywords_regular_expression}, {"tags" : keywords_regular_expression}] })
      }
    }

  }
  else{
    check.push({ $or: [{"title" : keywords_regular_expression}, {"description" : keywords_regular_expression}, {"tags" : keywords_regular_expression}] })
  }

  Platform.find({
    $and: [
      { 'isPublic': true },
      { $and: check }
  ]
}).limit(12).skip(req.params.page * 12)
    .then(platforms => res.json(platforms))
    .catch(err => res.status(400).json('Error: ' + err));
});

//get 10 most recent platforms
//{updatedAt: 'desc'}
router.route('/getRecentPlatforms').get((req, res) => {
  Platform.find({'isPublic': true}).sort({$natural:-1}).limit(10)
    .then(platforms => res.json(platforms))
    .catch(err => res.status(400).json('Error: ' + err));
});

// get platform by id
router.route('/:id').get((req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(406).send({status: false, message: ":id must be of ObjectId type"})
  }
  Platform.findById(req.params.id).populate('games','title description')
    .then(platform => res.json(platform))
    .catch(err => res.status(400).json('Error: ' + err));
});

// get platform by id
router.route('/getPlatformGames/:id').get((req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(406).send({status: false, message: ":id must be of ObjectId type"})
  }
  Platform.findById(req.params.id).select('games').select('-_id').populate('games','title description -_id').select('-_id')
    .then(platform => res.json(platform))
    .catch(err => res.status(400).json('Error: ' + err));
});

// get platform by gameId
router.route('/getPlatformByGameId/:id').get((req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(406).send({status: false, message: ":id must be of ObjectId type"})
  }
  Platform.findOne({'games': req.params.id})
  .then(platform => res.json(platform))
  .catch(err => res.status(400).json('Error: ' + err));;
});

// get platform by ownerId
router.route('/getPlatformsByOwnerId/:id').get((req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(406).send({status: false, message: ":id must be of ObjectId type"})
  }
  Platform.find({'ownerId': req.params.id})
  .then(platform => res.json(platform))
  .catch(err => res.status(400).json('Error: ' + err));;
});

// add platform
router.route('/add').post((req, res) => {
  if (!req.body.ownerId){
    res.status(406).send({status: false, message: "ownerId parameter required"})
  }
  if (!req.body.title){
    res.status(406).send({status: false, message: "title parameter required"})
  }
  const ownerId = req.body.ownerId;
  const title = req.body.title;

  const newPlatform = new Platform({
    ownerId,
    title
  });

  newPlatform.save()
    .then(platform => res.json(`Platform ${platform.id} added!`))
    .catch(err => res.status(400).json('Error: ' + err));
});

// set public
router.route('/set_public/:id').patch((req, res) => {
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
router.route('/set_private/:id').patch((req, res) => {
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
router.route('/upvote/:id').patch((req, res) => {
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
router.route('/remove_upvote/:id').patch((req, res) => {
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
router.route('/downvote/:id').patch((req, res) => {
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
router.route('/remove_downvote/:id').patch((req, res) => {
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
router.route('/update/:id').patch((req, res) => {
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