const router = require('express').Router();
const mongoose = require('mongoose');
const session = require('express-session')
const MonggoDBSession = require('connect-mongodb-session')(session)
const bcrypt = require('bcryptjs')
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(406).send({status: false, message: ":id must be of ObjectId type"})
  }
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).send('Error: ' + err));
});

//find user by email, returns null otherwise
router.route('/getByEmail/:email').get((req, res) => {
  User.findOne({'email': req.params.email})
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

//find user by username excluding email, password, coin, completegames, and inventory fields, returns null if not found.
router.route('/getByUsername/:username').get((req, res) => {
  User.findOne({'username': req.params.username}, '-email -password -coin -completedgames -inventory')
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post(async(req, res) => {
  if (!req.body.username){
    res.status(406).send({status: false, message: "username parameter required"})
  }
  else if (!req.body.email){
    res.status(406).send({status: false, message: "email parameter required"})
  }
  else if (!req.body.password){
    res.status(406).send({status: false, message: "password parameter required"})
  }
  else{
    const {username, email, password} = req.body

    let user_email = await User.findOne({email})
    let user_username = await User.findOne({username})
    if (user_email){
      res.status(204).send({status: false, message: 'Email in use'})
    }else if (user_username){
      res.status(205).send({status: false, message: 'Username in use'})
    }else{
      const hashedPw = await bcrypt.hash(password, 12)
      const newUser = new User({
        username,
        email,
        password: hashedPw
      });

      await newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    }
  } 
});


router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').patch((req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(406).send({status: false, message: ":id must be of ObjectId type"})
  }
  User.findById(req.params.id, function(err, retrievedUser){
    if (err){
      console.log(err);
      res.status(500).send()
    }else{
      if(!retrievedUser){res.status(404).send()} 
      else{
        if(req.body.username){retrievedUser.username = req.body.username}
        if(req.body.password){retrievedUser.password = req.body.password}
        if(req.body.email){retrievedUser.email = req.body.email}
        if(req.body.coin){retrievedUser.coin = req.body.coin}
        if(req.body.favorites){retrievedUser.favorites = req.body.favorites}
        if(req.body.downvoted){retrievedUser.downvoted = req.body.downvoted}
        if(req.body.ownedPlatforms){retrievedUser.ownedPlatforms = req.body.ownedPlatforms}
        if(req.body.completedGames){retrievedUser.completedGames = req.body.completedGames}
        if(req.body.inventory){retrievedUser.inventory = req.body.inventory}
        if(req.body.icon){retrievedUser.icon = req.body.icon}
        retrievedUser.save(function(err, updatedUser) {
          if (err){
            console.log(err);
            res.status(500).send()
          }else{
            res.send(updatedUser)
          }
        })
      }
    }
  })
})
module.exports = router;