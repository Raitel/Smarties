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

// get user profile information
// used for visiting user profiles
router.route('/getProfile/:username').get((req, res) => {
  User.findOne({ 'username': req.params.username }, '-password -email -coin -favorites -inventory')
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
  const { email, password } = req.body
  // validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Missing Fields' })
  }

  // Check for existing user
  User.findOne({ email })
    .then(user => {
      if (!user) return res.status(400).json({ msg: 'User does not exist' });

      // Validate password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' })
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

router.get('/auth/user', auth, (req, res) => {
  User.findById(req.user.id).populate('ownedPlatforms').populate('favorites')
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

module.exports = router;