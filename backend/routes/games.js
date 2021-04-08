const router = require('express').Router();
let Game = require('../models/game.model');

router.route('/').get((req, res) => {
    Game.find()
    .then(games => res.json(games))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Game.findById(req.params.id)
    .then(game => res.json(game))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
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
    .then(game => res.json(`Game ${game.id} added!`))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Game.findByIdAndDelete(req.params.id)
    .then(() => res.json('Game deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
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

// router.route('/updateStages/:id').post((req, res) => {
//   Game.findById(req.params.id, function(err, retrievedGame){
//   if(err){
//     console.log(err);
//     res.status(500).send()
//   }else{
//     if(!retrievedGame){
//       res.status(404).send()
//     } 
//     else{
//       if(req.body.type){retrievedStage.type = req.body.type};
//       if(req.body.question){retrievedStage.question = req.body.question};
//       if(req.body.answer){retrievedStage.answer = req.body.answer};
//       if(req.body.path){retrievedStage.path = req.body.path};
//       if(req.body.tip1){retrievedStage.tip1 = req.body.tip1};
//       if(req.body.tip2){retrievedStage.tip2 = req.body.tip2};
//       if(req.body.choice1){retrievedStage.choice1 = req.body.choice1};
//       if(req.body.choice2){retrievedStage.choice2 = req.body.choice2};
//       if(req.body.choice3){retrievedStage.choice3 = req.body.choice3};
//       if(req.body.choice4){retrievedStage.choice4 = req.body.choice4};
//       if(req.body.choice5){retrievedStage.choice5 = req.body.choice5};
//       if(req.body.letters){retrievedStage.letters = req.body.letters};

//       retrievedGame.nestedStages.push({type: 'testNestedStage'});
//       retrievedGame.save(function(err, updatedGame) {
//         if (err){
//           console.log(err);
//           res.status(500).send()
//         }else{
//           res.send(updatedGame)
//         };
//       });
//     };
//   };
// });
// });

router.route('/addStage/:id').post((req, res) => {
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
module.exports = router;