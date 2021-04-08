const mongoose = require('mongoose');
let Stage = require('./stage.model');
let Card = require('./card.model');

const Schema = mongoose.Schema;

const defaultQuestionCard = "606e7b59bee1d0599ca713b7";
const defaultTipCard = "606e7b59bee1d0599ca713b7";
const defaultAnswerCard = "606e7b59bee1d0599ca713b7";

const gameSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, default: "", trim: true},
  tags: [String],
  stages: [{type: Schema.Types.ObjectId, ref: 'Stage'}],
  questionCard: {type: Schema.Types.ObjectId, default: defaultQuestionCard, ref: 'Card'},
  tipCard: {type: Schema.Types.ObjectId, default: defaultTipCard, ref: 'Card'},
  AnswerCard: {type: Schema.Types.ObjectId, default: defaultAnswerCard, ref: 'Card'},
}, {
  timestamps: true,
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;