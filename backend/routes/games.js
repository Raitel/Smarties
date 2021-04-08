const router = require('express').Router();
let Game = require('../models/game.model');

router.route('/').get((req, res) => {
    Game.find()
    .then(cards => res.json(cards))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Game.findById(req.params.id)
    .then(card => res.json(card))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const tags = req.body.tags;
  const stages = req.body.stages;
  const questionCard = req.body.questionCard;
  const tipCard = req.body.tipCards;
  const answerCard = req.body.AnswerCard;

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
        if(req.body.AnswerCard){retrievedGame.AnswerCard = req.body.AnswerCard};
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