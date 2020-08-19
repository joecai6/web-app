var express = require('express');
var router = express.Router();
var User = require('../models/User.js');
var bcrypt = require('bcrypt');
var passport = require('passport')

const initializePassport = require('../passport.js');
initializePassport(passport);

function checkAuth(req, res, next){
  console.log("checking auth");
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
        console.log(req.user);
      });
    }
  })(req, res, next);
});

router.get('/logout', (req,res) => {
  req.session.destroy((err) => res.json({redirect: '/login'}));
})

router.post('/register', async (req,res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
  });

  const username = req.body.username;
  const password = await bcrypt.hash(req.body.password, 10);

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
