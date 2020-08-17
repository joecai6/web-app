var express = require('express');
var router = express.Router();
var User = require('../models/User.js');

router.route('/').get((req,res) => {

})

router.post('/login', (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({username: username}, (err, user) => {
    if(err){
      return res.status(400).json(err);
    }
    if(!user){
      return res.json("NO USER FOUND");
    }
    return res.status(200).json("USER FOUND");
  })
})

router.post('/register', (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  const newUser = new User({
    username: username,
    password: password,
    firstname: "test",
    lastname: "user"
  });

  newUser.save()
    .then(() => {
      res.json(`Added user`);
    })
    .catch(err => res.status(400).json(err))
})

module.exports = router;
