const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stageSchema = new Schema({
  type: { type: String, required: true},
  question: { type: String, default: ""},
  answer: { type: String, default: ""},
  tip1: { type: String, default: ""},
  tip2: { type: String, default: ""},
  choice1: { type: String, default: ""},
  choice2: { type: String, default: ""},
  choice3: { type: String, default: ""},
  choice4: { type: String, default: ""},
  choice5: { type: String, default: ""},
  letters: [String]
}, {
  timestamps: true,
});

const Stage = mongoose.model('Stage', stageSchema);

module.exports = Stage;