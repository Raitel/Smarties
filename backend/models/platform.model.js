const mongoose = require('mongoose');
let Game = require('./game.model');

const Schema = mongoose.Schema;

const platformSchema = new Schema({
    ownerid: { type: Schema.Types.ObjectId, required: true},
    title: { type: String, required: true, trim: true, minlength: 3 },
    description: { type: String, default: "", trim: true},
    visibility: { type: String, default: "PRIVATE"},
    upvotes: { type: Number, default: 0},
    downvotes: { type: Number, default: 0},
    tags: [String],
    games: [{type: Schema.Types.ObjectId, ref: 'Game'}],
}, {
  timestamps: true,
});

const Platform = mongoose.model('Platform', platformSchema);

module.exports = Platform;