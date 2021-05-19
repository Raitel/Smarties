const router = require('express').Router();
const mongoose = require('mongoose');
let Platform = require('../models/platform.model');
let User = require('../models/user.model');
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth');

// return all platforms
router.route('/').get((req, res) => {
  Platform.find()
    .then(platforms => res.json(platforms))
    .catch(err => res.status(400).json('Error: ' + err));
});

//return all public platforms only
router.route('/getPublicPlatforms').get((req, res) => {
  Platform.find({ 'isPublic': true })
    .then(platforms => res.json(platforms))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getRandomPlatforms').get((req, res) => {
  Platform.aggregate([
    { $match: { isPublic: true } },
    { $sample: { size: 12 } }
  ])
    .then(platforms => res.json(platforms))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getRecentlyUpdatedPlatforms').get((req, res) => {
  Platform.find({ 'isPublic': true }).sort({ 'updatedAt': -1 }).limit(12)
    .then(platforms => res.json(platforms))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getMostUpvotedPlatforms').get((req, res) => {
  Platform.aggregate([{ $match: { isPublic: true } }]).sort('Upvotes').limit(12)
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

  if (req.params.keyword.includes('&')) {
    keywords = req.params.keyword.split('&');
    //keywords_regular_expression = new RegExp(keywords.join("|"), "i");
    if (keywords.length > 1) {
      for (var i = 0; i < keywords.length; i++) {
        keywords_regular_expression = new RegExp(keywords[i], "i");
        check.push({ $or: [{ "title": keywords_regular_expression }, { "description": keywords_regular_expression }, { "tags": keywords_regular_expression }] })
      }
    }

  }
  else {
    check.push({ $or: [{ "title": keywords_regular_expression }, { "description": keywords_regular_expression }, { "tags": keywords_regular_expression }] })
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

  if (req.params.keyword.includes('&')) {
    keywords = req.params.keyword.split('&');

    if (keywords.length > 1) {
      for (var i = 0; i < keywords.length; i++) {
        keywords_regular_expression = new RegExp(keywords[i], "i");
        check.push({ $or: [{ "title": keywords_regular_expression }, { "description": keywords_regular_expression }, { "tags": keywords_regular_expression }] })
      }
    }

  }
  else {
    check.push({ $or: [{ "title": keywords_regular_expression }, { "description": keywords_regular_expression }, { "tags": keywords_regular_expression }] })
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
  Platform.find({ 'isPublic': true }).sort({ $natural: -1 }).limit(10)
    .then(platforms => res.json(platforms))
    .catch(err => res.status(400).json('Error: ' + err));
});

// get platform by id
router.route('/:id').get((req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(406).send({ status: false, message: ":id must be of ObjectId type" })
  }
  Platform.findById(req.params.id).populate('games', 'title description')
    .then(platform => res.json(platform))
    .catch(err => res.status(400).json('Error: ' + err));
});

// get platform by id
router.route('/getPlatformGames/:id').get((req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(406).send({ status: false, message: ":id must be of ObjectId type" })
  }
  Platform.findById(req.params.id).select('games').select('-_id').populate('games', 'title description -_id').select('-_id')
    .then(platform => res.json(platform))
    .catch(err => res.status(400).json('Error: ' + err));
});

// get platform by gameId
router.route('/getPlatformByGameId/:id').get((req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(406).send({ status: false, message: ":id must be of ObjectId type" })
  }
  Platform.findOne({ 'games': req.params.id })
    .then(platform => res.json(platform))
    .catch(err => res.status(400).json('Error: ' + err));;
});

// get platform by ownerId
router.route('/getPlatformsByOwnerId/:id').get((req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(406).send({ status: false, message: ":id must be of ObjectId type" })
  }
  Platform.find({ 'ownerId': req.params.id })
    .then(platform => res.json(platform))
    .catch(err => res.status(400).json('Error: ' + err));;
});

// add platform
router.route('/add').post((req, res) => {
  if (!req.body.ownerId) {
    res.status(406).send({ status: false, message: "ownerId parameter required" })
  }
  if (!req.body.title) {
    res.status(406).send({ status: false, message: "title parameter required" })
  }
  if (!req.body.description) {
    res.status(406).send({ status: false, message: "description parameter required" })
  }
  const ownerId = req.body.ownerId;
  const title = req.body.title;
  const description = req.body.description;

  const newPlatform = new Platform({
    ownerId,
    title,
    description
  });

  newPlatform.save()
    .then(platform => res.json(`Platform ${platform.id} added!`))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.put('/push', auth, (req, res) => {
  // req.user.id passed from auth middlware
  console.log('Push Platform Request')
  console.log('Target User: ', req.user.id)
  console.log('Title: ', req.body.title)
  console.log('Description: ', req.body.description)
  User.findById(req.user.id)
    .then((retrievedUser) => {// a user has been found
      // creating a platform
      const newPlatform = new Platform({
        ownerId: req.user.id,
        title: req.body.title,
        description: req.body.description
      })
      //saving the platform
      newPlatform.save()
        .then(platform => {// platform has been saved
          //modifying ownedPlatforms via push
          retrievedUser.ownedPlatforms.push(platform.id)
          //saving the user
          retrievedUser.save()
            .then(user => res.json({
              msg: 'Added Platform ' + platform._id + ' to user ' + retrievedUser._id,
              platform_id: platform._id
            }))
            .catch(err => res.status(400).json('Error adding to user ownedPlatforms'))
        })
        .catch(err => res.status(400).json('Error creating platform'));
    })
    .catch(err => res.json(400).json({ msg: 'User not found' }));
})

// set public
router.route('/set_public/:id').patch((req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(406).send({ status: false, message: ":id must be of ObjectId type" })
  }
  Platform.findById(req.params.id, function (err, retrievedPlatform) {
    if (err) {
      console.log(err);
      res.status(500).send()
    } else {
      if (!retrievedPlatform) { res.status(404).send() }
      else {
        retrievedPlatform.isPublic = true;
        retrievedPlatform.save(function (err, updatedPlatform) {
          if (err) {
            console.log(err);
            res.status(500).send()
          } else {
            res.send(updatedPlatform)
          }
        })
      }
    }
  })
});

// set private
router.route('/set_private/:id').patch((req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(406).send({ status: false, message: ":id must be of ObjectId type" })
  }
  Platform.findById(req.params.id, function (err, retrievedPlatform) {
    if (err) {
      console.log(err);
      res.status(500).send()
    } else {
      if (!retrievedPlatform) { res.status(404).send() }
      else {
        retrievedPlatform.isPublic = false;
        retrievedPlatform.save(function (err, updatedPlatform) {
          if (err) {
            console.log(err);
            res.status(500).send()
          } else {
            res.send(updatedPlatform)
          }
        })
      }
    }
  })
});

// upvote
router.route('/upvote/:id').patch((req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(406).send({ status: false, message: ":id must be of ObjectId type" })
  }
  Platform.findById(req.params.id, function (err, retrievedPlatform) {
    if (err) {
      console.log(err);
      res.status(500).send()
    } else {
      if (!retrievedPlatform) { res.status(404).send() }
      else {
        retrievedPlatform.upvotes = retrievedPlatform.upvotes + 1;
        retrievedPlatform.save(function (err, updatedPlatform) {
          if (err) {
            console.log(err);
            res.status(500).send()
          } else {
            res.send(updatedPlatform)
          }
        })
      }
    }
  })
});

// remove upvote
router.route('/remove_upvote/:id').patch((req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(406).send({ status: false, message: ":id must be of ObjectId type" })
  }
  Platform.findById(req.params.id, function (err, retrievedPlatform) {
    if (err) {
      console.log(err);
      res.status(500).send()
    } else {
      if (!retrievedPlatform) { res.status(404).send() }
      else {
        if (retrievedPlatform.upvotes > 0) {
          retrievedPlatform.upvotes = retrievedPlatform.upvotes - 1;
        }
        retrievedPlatform.save(function (err, updatedPlatform) {
          if (err) {
            console.log(err);
            res.status(500).send()
          } else {
            res.send(updatedPlatform)
          }
        })
      }
    }
  })
});

// downvote
router.route('/downvote/:id').patch((req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(406).send({ status: false, message: ":id must be of ObjectId type" })
  }
  Platform.findById(req.params.id, function (err, retrievedPlatform) {
    if (err) {
      console.log(err);
      res.status(500).send()
    } else {
      if (!retrievedPlatform) { res.status(404).send() }
      else {
        retrievedPlatform.downvotes = retrievedPlatform.downvotes + 1;
        retrievedPlatform.save(function (err, updatedPlatform) {
          if (err) {
            console.log(err);
            res.status(500).send()
          } else {
            res.send(updatedPlatform)
          }
        })
      }
    }
  })
});

// remove downvote
router.route('/remove_downvote/:id').patch((req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(406).send({ status: false, message: ":id must be of ObjectId type" })
  }
  Platform.findById(req.params.id, function (err, retrievedPlatform) {
    if (err) {
      console.log(err);
      res.status(500).send()
    } else {
      if (!retrievedPlatform) { res.status(404).send() }
      else {
        if (retrievedPlatform.downvotes > 0) {
          retrievedPlatform.downvotes = retrievedPlatform.downvotes - 1;
        }
        retrievedPlatform.save(function (err, updatedPlatform) {
          if (err) {
            console.log(err);
            res.status(500).send()
          } else {
            res.send(updatedPlatform)
          }
        })
      }
    }
  })
});

router.route('/set_banner/:id').patch((req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.json({ msg: ":id must be of ObjectId type" })
  }
  if (!req.body.bannerURL) {
    res.json({ msg: 'bannerURL required' })
  }
  Platform.findById(req.params.id)
    .then(retrievedPlatform => {
      retrievedPlatform.bannerURL = req.body.bannerURL
      retrievedPlatform.save()
        .then(updatedPlatform => res.send(updatedPlatform.bannerURL))
        .catch(err => res.status(400).json({ msg: 'Unable to save platform' }))
    })
    .catch(err => res.status(400).json({ msg: 'Platform not found' }))
});

// update platform
router.route('/update/:id').patch((req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(406).send({ status: false, message: ":id must be of ObjectId type" })
  }
  Platform.findById(req.params.id, function (err, retrievedPlatform) {
    if (err) {
      console.log(err);
      res.status(500).send()
    } else {
      if (!retrievedPlatform) { res.status(404).send() }
      else {
        if (req.body.title) { retrievedPlatform.title = req.body.title }
        if (req.body.description) { retrievedPlatform.description = req.body.description }
        if (req.body.isPublic) { retrievedPlatform.isPublic = req.body.isPublic }
        if (req.body.upvotes) { retrievedPlatform.upvotes = req.body.upvotes }
        if (req.body.downvotes) { retrievedPlatform.downvotes = req.body.downvotes }
        if (req.body.tags) { retrievedPlatform.tags = req.body.tags }
        if (req.body.games) { retrievedPlatform.games = req.body.games }
        if (req.body.isPublic) { retrievedPlatform.isPublic = req.body.isPublic }
        else if (req.body.isPublic === false) { retrievedPlatform.isPublic = req.body.isPublic }
        retrievedPlatform.save(function (err, updatedPlatform) {
          if (err) {
            console.log(err);
            res.status(500).send()
          } else {
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

// handle vote
router.patch("/vote", auth, (req, res) => {
  console.log("Vote Request")
  console.log('Target User: ', req.user.id)
  console.log('body:', req.body)
  console.log(req.body.platform)
  Platform.findById(req.body.platform, function (platformErr, retrievedPlatform) {
    if (platformErr) return res.json({ msg: 'Platform.findById error' })
    if (!retrievedPlatform) return res.json({ msg: 'No platform found error' })
    User.findById(req.user.id, function (userErr, retrievedUser) {
      if (userErr) return res.json({ msg: 'User.findById error' })
      if (!retrievedUser) return res.json({ msg: 'No user found error' })
      var index = -1;
      // Handle voting logic here
      // Case 1: Standard upvote/downvote
      if (!req.body.upvoted && !req.body.downvoted) {
        if (req.body.upvoteTarget) {// Standard Upvote
          console.log('Standard Upvote')
          retrievedPlatform.upvotes = retrievedPlatform.upvotes + 1
          retrievedUser.upvoted.push(req.body.platform)
        } else { // Standard Downvote
          console.log('Standard Downvote')
          retrievedPlatform.downvotes = retrievedPlatform.downvotes + 1
          retrievedUser.downvoted.push(req.body.platform)
        }
      } else if (req.body.upvoteTarget) {
        // Case 2: Withdrawing upvote
        console.log('Withdrawing upvote')
        if (req.body.upvoted) {
          retrievedPlatform.upvotes = retrievedPlatform.upvotes - 1
          index = retrievedUser.upvoted.indexOf(req.body.platform)
          retrievedUser.upvoted.splice(index, 1)
        } else { // Case 3: Withdraw downvote and assign upvote
          console.log('Withdraw downvote and assign upvote')
          retrievedPlatform.downvotes = retrievedPlatform.downvotes - 1
          index = retrievedUser.downvoted.indexOf(req.body.platform)
          retrievedUser.downvoted.splice(index, 1)
          retrievedPlatform.upvotes = retrievedPlatform.upvotes + 1
          retrievedUser.upvoted.push(req.body.platform)
        }
      } else if (req.body.downvoteTarget) {
        // Case 4: Withdrawing downvote
        console.log('Withdrawing downvote')
        if (req.body.downvoted) {
          retrievedPlatform.downvotes = retrievedPlatform.downvotes - 1
          index = retrievedUser.downvoted.indexOf(req.body.platform)
          retrievedUser.downvoted.splice(index, 1)
        } else { // Case 5: Withdraw upvote and assign downvote
          console.log('Withdraw upvote and assign downvote')
          retrievedPlatform.upvotes = retrievedPlatform.upvotes - 1
          index = retrievedUser.upvoted.indexOf(req.body.platform)
          retrievedUser.upvoted.splice(index, 1)
          retrievedPlatform.downvotes = retrievedPlatform.downvotes + 1
          retrievedUser.downvoted.push(req.body.platform)
        }
      }

      retrievedPlatform.save(function (pltErr) {
        if (pltErr) return res.json({ msg: 'error saving platform' })
        retrievedUser.save(function (usrErr) {
          if (usrErr) return res.json({ msg: 'error saving user' })
          res.json({
            status: true,
            msg: 'handled vote',
            user_id: retrievedUser._id,
            platform_id: retrievedPlatform._id,
          })
        })
      })


    })
  })
})

router.put('/favorite', auth, (req, res) => {
  // req.user.id passed from auth middlware

  User.findById(req.user.id)
    .then((retrievedUser) => {// a user has been found
      const platformId = req.body.platformId;
      const favorited = req.body.favorited;

      if(favorited){
        var filteredAry = retrievedUser.favorites.filter(platform => platform != platformId)
        retrievedUser.favorites = filteredAry;
      }
      else{
        retrievedUser.favorites.push(platformId);
      }
      retrievedUser.save()
      .then(user => res.json({
        msg: '(Un)favorites' + platformId + ' to user ' + retrievedUser._id
      }))
      .catch(err => res.status(400).json({msg: 'Error adding to user favorites' }))
    })
    .catch(err => res.json(400).json({ msg: 'User not found' }));
})

module.exports = router;