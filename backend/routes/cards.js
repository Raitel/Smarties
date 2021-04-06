const router = require('express').Router();
let Card = require('../models/card.model');

router.route('/').get((req, res) => {
  Card.find()
    .then(cards => res.json(cards))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Card.findById(req.params.id)
    .then(card => res.json(card))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const type = req.body.type;
  const price = req.body.price;
  const path = req.body.path;

  const newCard = new User({
    type,
    price,
    path
  });

  newCard.save()
    .then(() => res.json('Card added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Card.findByIdAndDelete(req.params.id)
    .then(() => res.json('Card deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// router.route('/update/:id').post((req, res) => {
//   Card.findById(req.params.id)
//     .then(card => {
//       card.type = req.body.type;
//       card.price = req.body.price;
//       card.path = req.body.path;

//       card.save()
//         .then(() => res.json('Card updated'))
//         .catch(err => res.status(400).json('Error: ' + err));
//     })
//     .catch(err => res.status(400).json('Error: ' + err))
// })

router.route('/update/:id').post((req, res) => {
  Card.findById(req.params.id, function(err, retrievedCard){
    if (err){
      console.log(err);
      res.status(500).send()
    }else{
      if(!retrievedCard){res.status(404).send()} 
      else{
        if(req.body.title){retrievedCard.type = req.body.type}
        if(req.body.description){retrievedCard.price = req.body.price}
        if(req.body.visibility){retrievedCard.path = req.body.path}
        retrievedCard.save(function(err, updatedCard) {
          if (err){
            console.log(err);
            res.status(500).send()
          }else{
            res.send(updatedCard)
          }
        })
      }
    }
  })
})


module.exports = router;