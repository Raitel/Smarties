const mongoose = require('mongoose');
let Game = require('./game.model');
let Platform = require('./platform.model');

const Schema = mongoose.Schema;

const defaultQuestionCard = "606e7b59bee1d0599ca713b7";
const defaultTipCard = "606e7b59bee1d0599ca713b7";
const defaultAnswerCard = "606e7b59bee1d0599ca713b7";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true, minlength: 3 },
  email: { type: String, required: true, unique: true, trim: true, minlength: 5 },
  password: { type: String, required: true, trim: false, minlength: 8 },
  coin: { type: Number, default: 0},
  favorites: [{type: Schema.Types.ObjectId, ref: 'Plaftorm'}],
  upvoted: [{type: Schema.Types.ObjectId, ref: 'Plaftorm'}],
  downvoted: [{type: Schema.Types.ObjectId, ref: 'Plaftorm'}],
  ownedplatforms: [{type: Schema.Types.ObjectId, ref: 'Plaftorm'}],
  completedgames: [{type: Schema.Types.ObjectId, ref: 'Game'}],
  inventory: {type: [{type: Schema.Types.ObjectId, ref: 'Card'}], default: [defaultQuestionCard, defaultTipCard, defaultAnswerCard]},
  icon: {type: Number, default: 0}
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;