const express = require('express');
const cors = require('cors');
const session = require('express-session')
const mongoose = require('mongoose');
const MonggoDBSession = require('connect-mongodb-session')(session)

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const isAuth = (req, res, next) => {
  if (req.session.isAuth){
    next()
  }else{
    res.redirect('/contact')
  }
}

const store = new MonggoDBSession({
  uri: uri,
  collection: 'sessions'
})
app.use(session({
  secret: 'key that will sign',
  resave: false,
  saveUninitialized: false,
  store: store
}))
app.use(cors());
app.use(express.json());

app.get("/testapi", (req, res) => {
  req.session.isAuth = true
  console.log(req.session)
  res.send("Hello sessions")
})



const usersRouter = require('./routes/users');
const platformsRouter = require('./routes/platforms');
const cardsRouter = require('./routes/cards');
const gamesRouter = require('./routes/games');

app.use('/platforms', platformsRouter);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('/games', gamesRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});