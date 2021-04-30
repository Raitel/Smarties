const router = require('express').Router();
const mongoose = require('mongoose');
let Card = require('../models/card.model');

// get all cards
router.route('/').get((req, res) => {
  Card.find()
    .then(cards => res.json(cards))
    .catch(err => res.status(400).json('Error: ' + err));
});

// get all QUESTION cards
router.route('/questionCards').get((req, res) => {
  Card.find({'type': "question"})
    .then(cards => res.json(cards))
    .catch(err => res.status(400).json('Error: ' + err));
});

// get all TIP cards
router.route('/tipCards').get((req, res) => {
  Card.find({'type': "tip"})
    .then(cards => res.json(cards))
    .catch(err => res.status(400).json('Error: ' + err));
});

// get all ANSWER cards
router.route('/answerCards').get((req, res) => {
  Card.find({'type': "answer"})
    .then(cards => res.json(cards))
    .catch(err => res.status(400).json('Error: ' + err));
});

// get card by id
router.route('/:id').get((req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(406).send({status: false, message: ":id must be of ObjectId type"})
  }
  Card.findById(req.params.id)
    .then(card => res.json(card))
    .catch(err => res.status(400).json('Error: ' + err));
});

// add card
router.route('/add').post((req, res) => {
  if (!req.body.type){
    res.status(406).send({status: false, message: "type parameter required"})
  }
  if (!req.body.price){
    res.status(406).send({status: false, message: "price parameter required"})
  }
  if (!req.body.path){
    res.status(406).send({status: false, message: "path parameter required"})
  }
  const type = req.body.type;
  const price = req.body.price;
  const path = req.body.path;

  const newCard = new Card({
    type,
    price,
    path
  });

  newCard.save()
    .then(() => res.json('Card added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// delete card
router.route('/:id').delete((req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(406).send({status: false, message: ":id must be of ObjectId type"})
  }
  Card.findByIdAndDelete(req.params.id)
    .then(() => res.json('Card deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//update card
router.route('/update/:id').patch((req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(406).send({status: false, message: ":id must be of ObjectId type"})
  }
  Card.findById(req.params.id, function(err, retrievedCard){
    if(err){
      console.log(err);
      res.status(500).send()
    }else{
      if(!retrievedCard){
        res.status(404).send()
      } 
      else{
        if(req.body.type){retrievedCard.type = req.body.type};
        if(req.body.price){retrievedCard.price = req.body.price};
        if(req.body.path){retrievedCard.path = req.body.path};
        retrievedCard.save(function(err, updatedCard) {
          if (err){
            console.log(err);
            res.status(500).send()
          }else{
            res.send(updatedCard)
          };
        });
      };
    };
  });
});


module.exports = router;