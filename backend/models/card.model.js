const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cardSchema = new Schema({
  type: { type: String },
  price: { type: Number },
  path: { type: String }
}, {
  timestamps: true,
});

const User = mongoose.model('User', cardSchema);

module.exports = User;