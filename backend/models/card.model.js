const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cardSchema = new Schema({
  type: {type: String, required: true},
  price: {type: Number, required: true},
  path: {type: String, required: true}
}, {
  timestamps: true,
});

const User = mongoose.model('User', cardSchema);

module.exports = User;