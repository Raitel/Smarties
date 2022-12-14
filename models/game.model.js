const mongoose = require('mongoose');
let Stage = require('./stage.model');
let Card = require('./card.model');

const Schema = mongoose.Schema;

const defaultQuestionCard = "606e7b59bee1d0599ca713b7";
const defaultTipCard = "606e7b59bee1d0599ca713b7";
const defaultAnswerCard = "606e7b59bee1d0599ca713b7";

const nestedStageSchema = new Schema({
  type: { type: String, default: "Multiple Choice"},
  question: { type: String, default: "Please Input a Question"},
  answer: { type: String, default: "Please Input the Answer"},
  tip1: { type: String, default: "Please Input Tip 1"},
  tip2: { type: String, default: "Please Input Tip 2"},
  choice1: { type: String, default: "Please Input the Answer"},
  choice2: { type: String, default: "Please Input a wrong Answer (1)"},
  choice3: { type: String, default: "Please Input a wrong Answer (2)"},
  choice4: { type: String, default: "Please Input a wrong Answer (3)"},
  choice5: { type: String, default: "Please Input a wrong Answer (4)"},
  letters: [String]
});

const gameSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, default: "", trim: true},
  tags: [String],
  stages: [{type: Schema.Types.ObjectId, ref: 'Stage'}],
  questionCard: {type: Schema.Types.ObjectId, default: defaultQuestionCard, ref: 'Card'},
  tipCard: {type: Schema.Types.ObjectId, default: defaultTipCard, ref: 'Card'},
  answerCard: {type: Schema.Types.ObjectId, default: defaultAnswerCard, ref: 'Card'},
  nestedStages:[nestedStageSchema]
}, {
  timestamps: true,
});



const Game = mongoose.model('Game', gameSchema);
const nestedStages = mongoose.model('nestedStages', nestedStageSchema);

module.exports = Game;
//module.exports = nestedStages;