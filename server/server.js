const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

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