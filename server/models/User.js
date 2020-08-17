const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {type: String, unique: true},
  password: {type: String},
  firstname: String,
  lastname: String,
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema);