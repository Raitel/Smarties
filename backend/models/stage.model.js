const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stageSchema = new Schema({
  type: { type: String, required: true },
  question: { type: String, required: true },
  answer: { type: String },
  tip1: { type: String },
  tip2: { type: String },
  choice1: { type: String },
  choice2: { type: String },
  choice3: { type: String },
  choice4: { type: String },
  choice5: { type: String },
  answer: [String]
}, {
  timestamps: true,
});

const Stage = mongoose.model('Stage', stageSchema);

module.exports = Stage;