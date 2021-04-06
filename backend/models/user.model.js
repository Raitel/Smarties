const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true, minlength: 3 },
  email: { type: String, required: true, unique: true, trim: true, minlength: 5 },
  password: { type: String, required: true, trim: false, minlength: 8 },
  coin: { type: Number, default: 0},
  favorites: [Schema.Types.ObjectId],
  upvoted: [Schema.Types.ObjectId],
  downvoted: [Schema.Types.ObjectId],
  ownedplatforms: [Schema.Types.ObjectId],
  completedgames: [Schema.Types.ObjectId],
  inventory: [Schema.Types.ObjectId],
  icon: {type: Number, default: 0}
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;