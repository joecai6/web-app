var express = require('express');
var router = express.Router();
var Plan = require('../models/Plan.js');
var User = require('../models/User.js');

router.get('/', (req, res) => {
  let query = Plan.where({userId: req.user.id});
  query.findOne((err, data) => {
    if(err) return err;
    if(data){
      return res.json({term: data.yearTerms, success: 1});
    }
    else {
      return res.json({msg: 'no data found', success: 0});
    }
  })}
)

router.post('/addTerm', (req, res) => {
  let query = Plan.where({userId: req.user.id});
  query.findOne((err, data) => {
    if(err) return err;
    if(data){
      data.yearTerms = req.body.term;
      data.save().then(() => {
        return res.json({msg: "Update plan"});
      })
      .catch(err => res.status(400).json(err))
    }
    else {
      const data = new Plan({
        userId: req.user.id,
        username: req.user.username,
        message: "added new plan",
        yearTerms: req.body.term
      })
    
      data.save().then(() => {
        return res.json({msg: "New plan created"});
      })
      .catch(err => res.status(400).json(err))
    }
  })


})

router.post('/add', (req, res) => {
  User.findById(req.user.id, (err,user) => {
    if(err) throw err;
  })

  const data = new Plan({
    userId: req.user.id,
    username: req.user.username,
    message: req.body.msg,
    yearTerms: req.body.term
  })

  data.save().then(() => {
    return res.json({msg: "Added msg into databse"});
  })
  .catch(err => res.status(400).json(err))
})

module.exports = router;