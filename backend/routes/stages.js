const router = require('express').Router();
let Stage = require('../models/stage.model');

router.route('/').get((req, res) => {
    Stage.find()
    .then(cards => res.json(cards))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Stage.findById(req.params.id)
    .then(card => res.json(card))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const type = req.body.type;
  const question = req.body.question;
  const answer = req.body.answer;
  const tip1 = req.body.tip1;
  const tip2 = req.body.tip2;
  const choice1 = req.body.choice1;
  const choice2 = req.body.choice2;
  const choice3 = req.body.choice3;
  const choice4 = req.body.choice4;
  const choice5 = req.body.choice5;
  const letters = req.body.answer;

  const newStage = new Stage({
    type,
    question,
    answer,
    tip1,
    tip2,
    choice1,
    choice2,
    choice3,
    choice4,
    choice5,
    letters
  });

  newStage.save()
    .then(stage => res.json(`Stage ${stage.id} added!`))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Stage.findByIdAndDelete(req.params.id)
    .then(() => res.json('Stage deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Stage.findById(req.params.id, function(err, retrievedStage){
    if(err){
      console.log(err);
      res.status(500).send()
    }else{
      if(!retrievedStage){
        res.status(404).send()
      } 
      else{
        if(req.body.type){retrievedStage.type = req.body.type};
        if(req.body.question){retrievedStage.question = req.body.question};
        if(req.body.answer){retrievedStage.answer = req.body.answer};
        if(req.body.path){retrievedStage.path = req.body.path};
        if(req.body.tip1){retrievedStage.tip1 = req.body.tip1};
        if(req.body.tip2){retrievedStage.tip2 = req.body.tip2};
        if(req.body.choice1){retrievedStage.choice1 = req.body.choice1};
        if(req.body.choice2){retrievedStage.choice2 = req.body.choice2};
        if(req.body.choice3){retrievedStage.choice3 = req.body.choice3};
        if(req.body.choice4){retrievedStage.choice4 = req.body.choice4};
        if(req.body.choice5){retrievedStage.choice5 = req.body.choice5};
        if(req.body.letters){retrievedStage.letters = req.body.letters};
        retrievedStage.save(function(err, updatedStage) {
          if (err){
            console.log(err);
            res.status(500).send()
          }else{
            res.send(updatedStage)
          };
        });
      };
    };
  });
});


module.exports = router;