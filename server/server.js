const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
var User = require('./models/User.js');
var bcrypt = require('bcrypt');

require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true 
}));

app.use(express.json());
app.use(flash());
app.use(session({
  secret: "car",
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

const uri = process.env.DB_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

mongoose.connection.once('open', ()=>{
  console.log("connection with mongoDb altas database established sucessfully")
})

const usersRouter = require('./routes/users.js')
const planRouter = require('./routes/plan.js')

app.use('/users', usersRouter);
app.use('/plan', planRouter);

app.listen(port, () => {
  console.log(`server running on port: ${port}`)
})