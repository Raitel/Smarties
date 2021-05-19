const router = require('express').Router();
const mongoose = require('mongoose');
const session = require('express-session')
const MonggoDBSession = require('connect-mongodb-session')(session)
const bcrypt = require('bcryptjs')
let User = require('../models/user.model');
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(406).send({ status: false, message: ":id must be of ObjectId type" })
  }
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).send('Error: ' + err));
});

//find user by email, returns null otherwise
router.route('/getByEmail/:email').get((req, res) => {
  User.findOne({ 'email': req.params.email })
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

//find user by username excluding email, password, coin, completegames, and inventory fields, returns null if not found.
router.route('/getByUsername/:username').get((req, res) => {
  User.findOne({ 'username': req.params.username }, '-email -password -coin -completedgames -inventory')
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getUsernameById/:id').get((req, res) => {
  User.findById(req.params.id).select('username')
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

// get user profile information
// used for visiting user profiles
router.route('/getProfile/:username').get((req, res) => {
  User.findOne({ 'username': req.params.username }, '-password -email -favorites -inventory').populate('ownedPlatforms')
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.post('/auth/register', (req, res) => {
  const { username, email, password } = req.body
  // validation
  if (!username || !email || !password) {
    return res.status(400).json({ msg: 'Missing Fields' })
  }

  // Check for existing user
  User.findOne({ $or: [{ email: email }, { username: username }] })
    .then(user => {
      if (user) return res.status(400).json({ msg: 'User already exists' });

      const newUser = new User({
        username,
        email,
        password
      });

      // Create salt & hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => {
              jwt.sign(
                { id: user._id },
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                  if (err) throw err;
                  res.json({
                    token,
                    user: {
                      id: user._id,
                      username: user.username,
                      email: user.email
                    }
                  });
                }
              )
            })
        })
      })
    })
})

router.post('/auth/login', (req, res) => {
  console.log(req.body.email)
  console.log(req.body.password)
  User.findOne({ 'email': req.body.email }, function (err, retrievedUser) {
    if (!retrievedUser) return res.json({ status: false, code: 1, msg: 'no user found' })
    bcrypt.compare(req.body.password, retrievedUser.password)
      .then(isMatch => {
        if (!isMatch) return res.json({ status: false, code: 2, msg: 'Invalid Password' })
        console.log('here')
        jwt.sign(
          { id: retrievedUser._id },
          config.get('jwtSecret'),
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: retrievedUser._id,
                username: retrievedUser.username,
                email: retrievedUser.email
              }
            });
          }
        )
      })
      .catch(err => res.json({ msg: 'Bcrypt Error' }))
  })
})

router.get('/auth/user', auth, (req, res) => {
  User.findById(req.user.id).populate('ownedPlatforms').populate('favorites').populate('recent')
    .select('-password')
    .then(user => res.json(user))
})

router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').patch((req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(406).send({ status: false, message: ":id must be of ObjectId type" })
  }
  User.findById(req.params.id, function (err, retrievedUser) {
    if (err) {
      console.log(err);
      res.status(500).send()
    } else {
      if (!retrievedUser) { res.status(404).send() }
      else {
        if (req.body.username) { retrievedUser.username = req.body.username }
        if (req.body.password) { retrievedUser.password = req.body.password }
        if (req.body.email) { retrievedUser.email = req.body.email }
        if (req.body.coin) { retrievedUser.coin = req.body.coin }
        if (req.body.favorites) { retrievedUser.favorites = req.body.favorites }
        if (req.body.downvoted) { retrievedUser.downvoted = req.body.downvoted }
        if (req.body.ownedPlatforms) { retrievedUser.ownedPlatforms = req.body.ownedPlatforms }
        if (req.body.completedGames) { retrievedUser.completedGames = req.body.completedGames }
        if (req.body.inventory) { retrievedUser.inventory = req.body.inventory }
        if (req.body.icon) { retrievedUser.icon = req.body.icon }
        retrievedUser.save(function (err, updatedUser) {
          if (err) {
            console.log(err);
            res.status(500).send()
          } else {
            res.send(updatedUser)
          }
        })
      }
    }
  })
})

router.put("/updateUsername", auth, (req, res) => {
  console.log('Update Username Request')
  console.log('Target User: ', req.user.id)
  console.log('Username: ', req.body.username)
  User.findOne(req.body.username)
    .then(retrievedUser => {
      if (retrievedUser) { res.json({ status: false, msg: 'Username in use' }) }
    })
    .catch(err => {
      User.findById(req.user.id)
        .then(targetUser => {
          targetUser.username = req.body.username
          targetUser.save()
            .then(sucessUser => res.json({
              status: true,
              msg: "Changed " + req.user.id + " username to " + req.body.username,
              user_id: req.user.id
            }))
            .catch(err => res.json({ msg: 'Error saving target user' }))
        })
        .catch(err => res.json({ msg: 'Error finding target user' }))
    })
})

router.put("/updatePassword", auth, (req, res) => {
  console.log('Update Password Request')
  console.log('Target User: ', req.user.id)
  console.log('Cur Password: ', req.body.password)
  console.log('New Password: ', req.body.newPassword)
  User.findById(req.user.id, function (err, retrievedUser) {
    if (err) return res.json({ msg: 'Error finding target user' })
    bcrypt.compare(req.body.password, retrievedUser.password)
      .then(isMatch => {
        if (!isMatch) return res.json({ status: false, code: 1, msg: 'password mismatch?' })
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.newPassword, salt, (err, hash) => {
            if (err) { throw err }
            retrievedUser.password = hash;
            retrievedUser.save()
              .then(sucessUser => res.json({
                status: true,
                msg: "Changed password for user " + req.user.id,
                user_id: req.user.id
              }))
              .catch(err => res.json({ msg: 'Error saving new password' }))
          })
        })
      })
      .catch(err => res.json({ msg: 'Bcrypt Error' }))
  })
})

router.put('/updateRecent', auth, (req, res) => {
  // req.user.id passed from auth middlware

  User.findById(req.user.id)
    .then((retrievedUser) => {// a user has been found
      const platformId = req.body.platformId;

      var recent = retrievedUser.recent;
      recent.unshift(platformId);
      recent = recent.filter(function(item, pos) {
        return recent.indexOf(item) == pos;
      })
      recent = recent.slice(0,5);
      
      retrievedUser.recent = recent;

      retrievedUser.save()
      .then(user => res.json({
        msg: 'Add recently used platform' + platformId + ' to user ' + retrievedUser._id
      }))
      .catch(err => res.status(400).json({msg: 'Error adding to user recently used' }))
    })
    .catch(err => res.json(400).json({ msg: 'User not found' }));
})

module.exports = router;