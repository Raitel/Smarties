const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

//find user by email, returns null if not found.
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

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const newUser = new User({
    username,
    email,
    password
  });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
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
        if(req.body.ownedplatforms){retrievedUser.ownedplatforms = req.body.ownedplatforms}
        if(req.body.completedgames){retrievedUser.completedgames = req.body.completedgames}
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