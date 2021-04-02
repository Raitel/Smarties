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
    .then(() => res.json('Platform added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Platform.findByIdAndDelete(req.params.id)
    .then(platform => res.json('Platform deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// router.route('/update/:id').post((req, res) => {
//   Platform.findById(req.params.id)
//     .then(platform => {
//       platform.email = req.body.email;

//       user.save()
//         .then(() => res.json('User updated'))
//         .catch(err => res.status(400).json('Error: ' + err));
//     })
//     .catch(err => res.status(400).json('Error: ' + err))
// })

module.exports = router;