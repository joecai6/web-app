const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const planSchema = new Schema({
  userId: String,
  username: String,
  message: String,
  yearTerms: [{ title: String,
          courses: [{
            name: String,
            units: Number,
            desc: String,
            _id:  false
          }],
          _id: false
        }]
}, {timestamps: true})

//make a separate schemas for all years
module.exports = mongoose.model('Plan', planSchema);