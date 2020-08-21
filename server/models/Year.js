const mongoose = require('mongoose');
const Plan = require('./Plan');

const Schema = mongoose.Schema;
const yearSchema = new Schema({
  userId: String,
  years: [Plan.schema]
}, {timestamps: true})

module.exports = mongoose.model('Year', yearSchema);