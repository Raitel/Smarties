const mongoose = require('mongoose');
let Stage = require('./stage.model');

const Schema = mongoose.Schema;

const stageSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: "", trim: true},
  tags: [String],
  stages: [{type: Schema.Types.ObjectId, ref: 'Stage'}],
  cards: [{type: Schema.Types.ObjectId, ref: 'Card'}],
}, {
  timestamps: true,
});

const Game = mongoose.model('Game', stageSchema);

module.exports = Game;