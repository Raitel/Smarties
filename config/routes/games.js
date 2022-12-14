const router = require('express').Router();
const mongoose = require('mongoose');
let Game = require('../models/game.model');

// GAME API
// get all games
router.route('/').get((req, res) => {
    Game.find()
    .then(games => res.json(games))
    .catch(err => res.status(400).json('Error: ' + err));
});

//get games by keyword
// router.route('/getGamesByKeyword/:keyword').get((req, res) => {
//   Game.find({
//     $and: [
//         { $or: [{"title" : new RegExp(req.params.keyword,'i')}, {"description" : new RegExp(req.params.keyword,'i')}, {"tags" : new RegExp(req.params.keyword,'i')}] }
//     ]
// })
//     .then(games => res.json(games))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

//get games by multiple keyword
router.route('/getGamesByKeyword/:keyword').get((req, res) => {
  var keywords = req.params.keyword;
  var keywords_regular_expression = new RegExp(keywords, "i");

  if(req.params.keyword.includes('&')){
    keywords = req.params.keyword.split('&');
    keywords_regular_expression = new RegExp(keywords.join("|"), "i");
  }

  Game.find({
    $and: [
      { $or: [{"title" : keywords_regular_expression}, {"description" : keywords_regular_expression}, {"tags" : keywords_regular_expression}] }
  ]
})
    .then(games => res.json(games))
    .catch(err => res.status(400).json('Error: ' + err));
});

// get game by id
router.route('/:id').get((req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(406).send({status: false, message: ":id must be of ObjectId type"})
  }
  Game.findById(req.params.id)
  .then(game => res.json(game))
  .catch(err => res.status(400).json('Error: ' + err));
});

// add game
router.route('/add').post((req, res) => {
  if (!req.body.title){
    res.status(406).send({status: false, message: "title parameter required"})
  }
  const title = req.body.title;
  const description = req.body.description;
  const tags = req.body.tags;
  const stages = req.body.stages;
  const questionCard = req.body.questionCard;
  const tipCard = req.body.tipCards;
  const answerCard = req.body.answerCard;

  const newGame = new Game({
    title,
    description,
    tags,
    stages,
    questionCard,
    tipCard,
    answerCard
  });

  newGame.save()
    .then(game => res.send({status: true, game_id: game.id}))
    .catch(err => res.status(400).json('Error: ' + err));
});

// update game
router.route('/update/:id').patch((req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(406).send({status: false, message: ":id must be of ObjectId type"})
  }
    Game.findById(req.params.id, function(err, retrievedGame){
    if(err){
      console.log(err);
      res.status(500).send()
    }else{
      if(!retrievedGame){
        res.status(404).send()
      } 
      else{
        if(req.body.title){retrievedGame.title = req.body.title};
        if(req.body.description){retrievedGame.description = req.body.description};
        if(req.body.tags){retrievedGame.tags = req.body.tags};
        if(req.body.stages){retrievedGame.stages = req.body.stages};
        if(req.body.questionCard){retrievedGame.questionCard = req.body.questionCard};
        if(req.body.tipCard){retrievedGame.tipCard = req.body.tipCard};
        if(req.body.answerCard){retrievedGame.answerCard = req.body.answerCard};
        if(req.body.nestedStages){retrievedGame.nestedStages = req.body.nestedStages};
        retrievedGame.save(function(err, updatedGame) {
          if (err){
            console.log(err);
            res.status(500).send()
          }else{
            res.send(updatedGame)
          };
        });
      };
    };
  });
});

// delete game
router.route('/:id').delete((req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(406).send({status: false, message: ":id must be of ObjectId type"})
  }
  Game.findByIdAndDelete(req.params.id)
  .then(() => res.json('Game deleted'))
  .catch(err => res.status(400).json('Error: ' + err));
});

// STAGE API
// add stage
router.route('/:id/addStage').post((req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(406).send({status: false, message: ":id must be of ObjectId type"})
  }
  Game.findById(req.params.id, function(err, retrievedGame){
  if(err){
    console.log(err);
    res.status(500).send()
  }else{
    if(!retrievedGame){
      res.status(404).send()
    }
    else{
      retrievedGame.nestedStages.push({
        type: req.body.type,
        question: req.body.question,
        answer: req.body.answer,
        tip1: req.body.tip1,
        tip2: req.body.tip2,
        choice1: req.body.choice1,
        choice2: req.body.choice2,
        choice3: req.body.choice3,
        choice4: req.body.choice4,
        choice5: req.body.choice5,
        letters: req.body.letters
    });
    retrievedGame.save(function(err, updatedGame) {
      if (err){
        console.log(err);
        res.status(500).send()
      }else{
        res.send(updatedGame)
      };
    });
    };
  };
});
});

// update stage
router.route('/:id/updateStage/:index').patch((req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(406).send({status: false, message: ":id must be of ObjectId type"})
  }
  Game.findById(req.params.id, function(err, retrievedGame){
  if(err){
    console.log(err);
    res.status(500).send()
  }else{
    if(!retrievedGame){
      res.status(404).send({status: false, message: "game not found"})
    }
    else if(retrievedGame.nestedStages.length <= req.params.index){
      res.status(400).send({status: false, message: "index out of bounds"})
    } 
    else{
      if(req.body.type){retrievedGame.nestedStages[req.params.index].type = req.body.type};
      if(req.body.question){retrievedGame.nestedStages[req.params.index].question = req.body.question};
      if(req.body.answer){retrievedGame.nestedStages[req.params.index].answer = req.body.answer};
      if(req.body.path){retrievedGame.nestedStages[req.params.index].path = req.body.path};
      if(req.body.tip1){retrievedGame.nestedStages[req.params.index].tip1 = req.body.tip1};
      if(req.body.tip2){retrievedGame.nestedStages[req.params.index].tip2 = req.body.tip2};
      if(req.body.choice1){retrievedGame.nestedStages[req.params.index].choice1 = req.body.choice1};
      if(req.body.choice2){retrievedGame.nestedStages[req.params.index].choice2 = req.body.choice2};
      if(req.body.choice3){retrievedGame.nestedStages[req.params.index].choice3 = req.body.choice3};
      if(req.body.choice4){retrievedGame.nestedStages[req.params.index].choice4 = req.body.choice4};
      if(req.body.choice5){retrievedGame.nestedStages[req.params.index].choice5 = req.body.choice5};
      if(req.body.letters){retrievedGame.nestedStages[req.params.index].letters = req.body.letters};
      retrievedGame.save(function(err, updatedGame) {
        if (err){
          console.log(err);
          res.status(500).send()
        }else{
          res.send(updatedGame)
        };
      });
    };
  };
});
});

// delete stage
router.route('/:id/deleteStage/:index').delete((req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)){
    res.status(406).send({status: false, message: ":id must be of ObjectId type"})
  }
  Game.findById(req.params.id, function(err, retrievedGame){
  if(err){
    console.log(err);
    res.status(500).send()
  }else{
    if(!retrievedGame){
      res.status(404).send({status: false, message: "game not found"})
    }
    else if(retrievedGame.nestedStages.length <= req.params.index){
      res.status(400).send({status: false, message: "index out of bounds"})
    } 
    else{
      retrievedGame.nestedStages[req.params.index].remove();
      retrievedGame.save(function(err, updatedGame) {
        if (err){
          console.log(err);
          res.status(500).send()
        }else{
          res.send(updatedGame)
        };
      });
    };
  };
});
});

module.exports = router;