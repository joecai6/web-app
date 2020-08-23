var express = require('express');
var router = express.Router();
var Plan = require('../models/Plan.js');
var User = require('../models/User.js');
var Year = require('../models/Year.js');

router.get('/', (req, res) => {
  let query = Plan.where({userId: req.user.id});
  query.findOne((err, data) => {
    if(err) return err;
    if(data && data.terms.length > 0){
      return res.json({term: data.terms, success: 1});
    }
    else {
      return res.json({msg: 'no data found', success: 0});
    }
  })}
)

router.post('/addPlan', (req,res) => {
  console.log(req.body.years);
})

router.get('/allTerms', (req, res) => {
  Plan.find({userId: req.user.id}, (err, docs) => {
    if(err) return err;
    if(docs){
      res.send(docs);
    }
  })
})

router.post('/addTerm', (req, res) => {
  let query = Plan.where({userId: req.user.id, year:req.body.termName});
  query.findOne((err, data) => {
    if(err) return err;
    if(data){
      let obj = {};
      data.terms = req.body.term;
      data.save().then(() => {
        obj.term = data;
      })
      .catch(err => res.status(400).json(err))

      Year.findOne({userId: req.user.id}, (err, plan) => {
        if(err) return err;
        if(plan){
          console.log("found plan");
          console.log(plan.years);
        }
      })
      res.send(obj);
    }
    else {
      let obj = {};
      const data = new Plan({
        userId: req.user.id,
        username: req.user.username,
        message: "added new plan",
        terms: req.body.term,
        year: req.body.termName
      })
    
      data.save().then(() => {
        obj.term = data;
      })
      .catch(err => res.status(400).json(err))

      Year.findOne({userId: req.user.id}, (err, plan) => {
        if(err) res.json(err);
        if(plan && plan.years){
          plan.years.push(data);
          plan.save().then(() => {
            console.log("Updated plan saved");
          })
          .catch(err => res.status(400).json(err))
        }
        else {
          const data2 = new Year({
            userId: req.user.id,
            years: [data]
          })
          data2.save().then(() => {
            obj.msg = "New year plan created";
            res.json(obj);
          })
          .catch(err => res.status(400).json(err))
        }
      })
        
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
    terms: req.body.term
  })

  data.save().then(() => {
    return res.json({msg: "Added msg into databse"});
  })
  .catch(err => res.status(400).json(err))
})

module.exports = router;