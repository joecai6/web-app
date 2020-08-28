var express = require('express');
var router = express.Router();
var User = require('../models/User.js');
var bcrypt = require('bcrypt');
var passport = require('passport')

const initializePassport = require('../passport.js');
initializePassport(passport);

function checkAuth(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.json({redirect: '/login'});
}

function checkNotAuth(req, res, next){
  if(req.isAuthenticated()){
    return res.json({redirect: '/'});
  }
  next();
}

router.get('/', checkAuth, (req,res) => {
  console.log(req.session);
  res.send(req.user);
})

router.get("/login", checkNotAuth, (req, res, next) => {
  res.send('inital login load / not logged in yet');
});

router.post("/login", checkNotAuth, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.json({msg: "Successfully Authenticated", redirect: '/'});
      });
    }
  })(req, res, next);
});

router.get('/logout', (req,res) => {
  req.session.destroy((err) => res.json({redirect: '/login'}));
})

router.post('/register', async (req,res) => {
  User.findOne({ username: req.body.username }, (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
  });

  let password = null;
  try {
    password = await bcrypt.hash(req.body.password, 10);
  }
  catch(e) {
    console.log("cannot encrpty passpowrd");
    throw(e);
  }

  const newUser = new User({
    username: req.body.username,
    password: password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });

  newUser.save()
    .then(() => {
      return res.json({msg: "Added user", redirect: "/login"});
    })
    .catch(err => res.status(400).json(err))
})

router.post('/update', (req,res)=>{
  let user = {username: req.user.username};
  let data = {
    school: req.body.school,
    major: req.body.major,
    start: req.body.start,
    end: req.body.end
  }

  User.findOneAndUpdate(user, data, {upsert: true}, (err, doc)=>{
    if (err) return res.send(500, {error: err});
    return res.send('Succesfully saved.');
  })
})

module.exports = router;
